document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar os feriados
    let feriados = [];
    
    // Feriados padrão caso o arquivo não possa ser carregado
    const feriadosPadrao = [
        new Date(2024, 0, 1),   // Ano Novo
        new Date(2024, 1, 21),  // Carnaval
        new Date(2024, 1, 22),  // Quarta-feira de Cinzas
        new Date(2024, 3, 19),  // Sexta-feira Santa
        new Date(2024, 3, 21),  // Tiradentes
        new Date(2024, 4, 1),   // Dia do Trabalho
        new Date(2024, 4, 30),  // Corpus Christi
        new Date(2024, 8, 7),   // Independência do Brasil
        new Date(2024, 9, 12),  // Nossa Senhora Aparecida
        new Date(2024, 10, 2),  // Finados
        new Date(2024, 10, 15), // Proclamação da República
        new Date(2024, 11, 25)  // Natal
    ];
    
    // Definir data atual como padrão
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];
    document.getElementById('data-inicio').value = dataFormatada;
    
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const amanhaFormatada = amanha.toISOString().split('T')[0];
    document.getElementById('data-fim').value = amanhaFormatada;
    
    // Carregar feriados
    carregarFeriados();
    
    // Calcular ao carregar a página
    calcularDiferenca();
    
    document.getElementById('calcular').addEventListener('click', calcularDiferenca);
    
    document.getElementById('data-inicio').addEventListener('change', function() {
        verificarDatas();
    });
    
    document.getElementById('data-fim').addEventListener('change', function() {
        verificarDatas();
    });
    
    // Função para carregar feriados do arquivo
    function carregarFeriados() {
        console.log('Tentando carregar feriados...');
        
        fetch('feriados.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Arquivo de feriados carregado com sucesso');
                // Processar o arquivo de feriados
                const linhas = data.split('\n');
                feriados = [];
                
                for (let linha of linhas) {
                    // Ignorar comentários e linhas vazias
                    if (linha.trim() === '' || linha.trim().startsWith('#')) {
                        continue;
                    }
                    
                    // Extrair data e nome do feriado
                    const partes = linha.split(',');
                    if (partes.length >= 1) {
                        const dataStr = partes[0].trim();
                        const nomeFeriado = partes.length > 1 ? partes[1].trim() : '';
                        
                        // Converter data do formato DD/MM/AAAA para objeto Date
                        const [dia, mes, ano] = dataStr.split('/').map(num => parseInt(num, 10));
                        const dataFeriado = new Date(ano, mes - 1, dia);
                        
                        // Adicionar ao array de feriados
                        feriados.push(dataFeriado);
                    }
                }
                
                console.log('Feriados carregados:', feriados.length);
                
                // Se não encontrou nenhum feriado, usar os padrões
                if (feriados.length === 0) {
                    console.log('Nenhum feriado encontrado no arquivo, usando feriados padrão');
                    feriados = [...feriadosPadrao];
                }
            })
            .catch(error => {
                console.error('Erro ao carregar feriados:', error);
                document.getElementById('erro').textContent = `Erro ao carregar feriados: ${error.message}. Usando feriados padrão.`;
                
                // Usar feriados padrão em caso de erro
                feriados = [...feriadosPadrao];
                console.log('Usando feriados padrão:', feriados.length);
            });
    }
    
    // Função para verificar se uma data é feriado
    function isFeriado(data) {
        const dataFormatada = new Date(data.getFullYear(), data.getMonth(), data.getDate());
        
        return feriados.some(feriado => {
            const feriadoFormatado = new Date(feriado.getFullYear(), feriado.getMonth(), feriado.getDate());
            return dataFormatada.getTime() === feriadoFormatado.getTime();
        });
    }
    
    function verificarDatas() {
        const dataInicio = new Date(document.getElementById('data-inicio').value);
        const dataFim = new Date(document.getElementById('data-fim').value);
        const erro = document.getElementById('erro');
        
        if (dataFim < dataInicio) {
            erro.textContent = "A data de término deve ser posterior à data de início!";
            document.getElementById('resultados').style.display = 'none';
            return false;
        } else {
            erro.textContent = "";
            return true;
        }
    }
    
    function calcularDiferenca() {
        if (!verificarDatas()) {
            return;
        }
        
        const dataInicio = new Date(document.getElementById('data-inicio').value);
        const dataFim = new Date(document.getElementById('data-fim').value);
        
        // Adicionar um dia para incluir o último dia na contagem
        const diferencaEmMilissegundos = dataFim.getTime() - dataInicio.getTime();
        const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24)) + 1;
        
        // Calcular dias úteis com feriados (segunda a sexta)
        let diasUteisComFeriados = 0;
        // Calcular dias úteis sem feriados (segunda a sexta, excluindo feriados)
        let diasUteisSemFeriados = 0;
        
        const dataAtual = new Date(dataInicio);
        
        // Ajustar para incluir o último dia na contagem
        dataFim.setDate(dataFim.getDate() + 1);
        
        while (dataAtual < dataFim) {
            // getDay() retorna 0 para domingo, 1 para segunda, ..., 6 para sábado
            const diaDaSemana = dataAtual.getDay();
            // Se for segunda (1) a sexta (5), é um dia útil
            if (diaDaSemana >= 1 && diaDaSemana <= 5) {
                diasUteisComFeriados++;
                
                // Verificar se não é feriado para contar dias úteis sem feriados
                if (!isFeriado(dataAtual)) {
                    diasUteisSemFeriados++;
                }
            }
            dataAtual.setDate(dataAtual.getDate() + 1);
        }
        
        // Formatar as datas para exibição
        const opcoesFormato = { day: 'numeric', month: 'long', year: 'numeric' };
        const dataInicioFormatada = dataInicio.toLocaleDateString('pt-BR', opcoesFormato);
        const dataFimFormatada = dataFim.toLocaleDateString('pt-BR', opcoesFormato);
        
        document.getElementById('periodo').textContent = `De ${dataInicioFormatada} até ${dataFimFormatada}`;
        document.getElementById('dias-corridos').textContent = `${diferencaEmDias} dias`;
        document.getElementById('dias-uteis-com-feriados').textContent = `${diasUteisComFeriados} dias`;
        document.getElementById('dias-uteis').textContent = `${diasUteisSemFeriados} dias`;
        document.getElementById('resultados').style.display = 'block';
    }
}); 
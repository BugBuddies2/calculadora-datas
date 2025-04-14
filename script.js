document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar os feriados
    let feriados = [];
    
    // Feriados padrão caso o arquivo não possa ser carregado
    const feriadosPadrao = [
        { dia: 1, mes: 0 },   // Ano Novo (janeiro é mês 0)
        { dia: 21, mes: 1 },  // Carnaval
        { dia: 22, mes: 1 },  // Quarta-feira de Cinzas
        { dia: 19, mes: 3 },  // Sexta-feira Santa
        { dia: 21, mes: 3 },  // Tiradentes
        { dia: 1, mes: 4 },   // Dia do Trabalho
        { dia: 30, mes: 4 },  // Corpus Christi
        { dia: 7, mes: 8 },   // Independência do Brasil
        { dia: 12, mes: 9 },  // Nossa Senhora Aparecida
        { dia: 2, mes: 10 },  // Finados
        { dia: 15, mes: 10 }, // Proclamação da República
        { dia: 25, mes: 11 }  // Natal
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
    
    // Função para formatar números com separadores de milhares
    function formatarNumero(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
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
                        
                        // Converter data do formato DD/MM para objeto
                        const [dia, mes] = dataStr.split('/').map(num => parseInt(num, 10));
                        // Mês em JavaScript é 0-11, então subtraímos 1
                        const feriado = { dia, mes: mes - 1 };
                        
                        // Adicionar ao array de feriados
                        feriados.push(feriado);
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
        const dia = data.getDate();
        const mes = data.getMonth(); // getMonth() já retorna 0-11
        
        return feriados.some(feriado => 
            feriado.dia === dia && feriado.mes === mes
        );
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
        document.getElementById('dias-corridos').textContent = `${formatarNumero(diferencaEmDias)} dias`;
        document.getElementById('dias-uteis-com-feriados').textContent = `${formatarNumero(diasUteisComFeriados)} dias`;
        document.getElementById('dias-uteis').textContent = `${formatarNumero(diasUteisSemFeriados)} dias`;
        document.getElementById('resultados').style.display = 'block';
    }
}); 
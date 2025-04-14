document.addEventListener('DOMContentLoaded', function() {
    // Definir data atual como padrão
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];
    document.getElementById('data-inicio').value = dataFormatada;
    
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const amanhaFormatada = amanha.toISOString().split('T')[0];
    document.getElementById('data-fim').value = amanhaFormatada;
    
    // Calcular ao carregar a página
    calcularDiferenca();
    
    document.getElementById('calcular').addEventListener('click', calcularDiferenca);
    
    document.getElementById('data-inicio').addEventListener('change', function() {
        verificarDatas();
    });
    
    document.getElementById('data-fim').addEventListener('change', function() {
        verificarDatas();
    });
    
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
        
        // Calcular dias úteis (segunda a sexta)
        let diasUteis = 0;
        const dataAtual = new Date(dataInicio);
        
        // Ajustar para incluir o último dia na contagem
        dataFim.setDate(dataFim.getDate() + 1);
        
        while (dataAtual < dataFim) {
            // getDay() retorna 0 para domingo, 1 para segunda, ..., 6 para sábado
            const diaDaSemana = dataAtual.getDay();
            // Se for segunda (1) a sexta (5), é um dia útil
            if (diaDaSemana >= 1 && diaDaSemana <= 5) {
                diasUteis++;
            }
            dataAtual.setDate(dataAtual.getDate() + 1);
        }
        
        // Formatar as datas para exibição
        const opcoesFormato = { day: 'numeric', month: 'long', year: 'numeric' };
        const dataInicioFormatada = dataInicio.toLocaleDateString('pt-BR', opcoesFormato);
        const dataFimFormatada = dataFim.toLocaleDateString('pt-BR', opcoesFormato);
        
        document.getElementById('periodo').textContent = `De ${dataInicioFormatada} até ${dataFimFormatada}`;
        document.getElementById('dias-corridos').textContent = `${diferencaEmDias} dias`;
        document.getElementById('dias-uteis').textContent = `${diasUteis} dias`;
        document.getElementById('resultados').style.display = 'block';
    }
}); 
// Função para verificar se uma data é fim de semana
function isFimDeSemana(data) {
    const dia = data.getDay();
    return dia === 0 || dia === 6; // 0 é domingo, 6 é sábado
}

// Função para calcular dias úteis entre duas datas
function calcularDiasUteis(dataInicial, dataFinal, considerarFeriados = false, isFeriado) {
    let diasUteis = 0;
    const dataAtual = new Date(dataInicial);
    
    while (dataAtual <= dataFinal) {
        if (!isFimDeSemana(dataAtual) && (!considerarFeriados || !isFeriado(dataAtual))) {
            diasUteis++;
        }
        dataAtual.setDate(dataAtual.getDate() + 1);
    }
    
    return diasUteis;
}

// Função para formatar número com separador de milhares
function formatarNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Exportar funções
export { isFimDeSemana, calcularDiasUteis, formatarNumero }; 
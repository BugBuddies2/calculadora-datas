import { carregarFeriados, isFeriado } from './modules/feriados.js';
import { calcularDiasUteis, formatarNumero, isFimDeSemana } from './modules/calculoDatas.js';

// Função para calcular dias de semana (excluindo sábados e domingos)
function calcularDiasDeSemana(dataInicial, dataFinal) {
    let diasDeSemana = 0;
    const dataAtual = new Date(dataInicial);
    
    // Avançar para o próximo dia para não contar o dia inicial
    dataAtual.setDate(dataAtual.getDate() + 1);
    
    while (dataAtual <= dataFinal) {
        if (!isFimDeSemana(dataAtual)) {
            diasDeSemana++;
        }
        dataAtual.setDate(dataAtual.getDate() + 1);
    }
    
    return diasDeSemana;
}

// Função para calcular e exibir resultados
function calcularResultados() {
    try {
        // Elementos do DOM
        const dataInicial = document.getElementById('dataInicial');
        const dataFinal = document.getElementById('dataFinal');
        const resultadoDiv = document.getElementById('resultado');
        const erroDiv = document.getElementById('erro');
        const periodoDiv = document.getElementById('periodo');
        const diasCorridosDiv = document.getElementById('dias-corridos');
        const diasUteisComFeriadosDiv = document.getElementById('dias-uteis-com-feriados');
        const diasUteisDiv = document.getElementById('dias-uteis');
        
        // Ajustar as datas para preservar o dia selecionado
        const dataInicialStr = dataInicial.value;
        const dataFinalStr = dataFinal.value;
        
        // Criar datas usando o formato YYYY-MM-DD para evitar problemas de timezone
        const inicio = new Date(dataInicialStr + 'T00:00:00');
        const fim = new Date(dataFinalStr + 'T00:00:00');

        if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
            throw new Error('Por favor, selecione datas válidas.');
        }

        if (inicio > fim) {
            throw new Error('A data inicial deve ser anterior à data final.');
        }

        // Formatar datas para exibição usando o formato brasileiro
        const formatoData = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const dataInicialFormatada = inicio.toLocaleDateString('pt-BR', formatoData);
        const dataFinalFormatada = fim.toLocaleDateString('pt-BR', formatoData);
        periodoDiv.textContent = `${dataInicialFormatada} a ${dataFinalFormatada}`;

        // Calcular dias corridos (não incluindo o dia inicial)
        const diasCorridos = Math.floor((fim - inicio) / (1000 * 60 * 60 * 24));
        diasCorridosDiv.textContent = formatarNumero(diasCorridos);
        
        // Calcular dias de semana (excluindo sábados e domingos)
        const diasDeSemana = calcularDiasDeSemana(inicio, fim);
        diasUteisComFeriadosDiv.textContent = formatarNumero(diasDeSemana);
        
        // Calcular dias úteis (dias de semana que não são feriados)
        const diasUteis = calcularDiasUteis(inicio, fim, true, isFeriado);
        diasUteisDiv.textContent = formatarNumero(diasUteis);

        // Esconder mensagem de erro se existir
        erroDiv.classList.add('d-none');
    } catch (erro) {
        // Elementos do DOM
        const erroDiv = document.getElementById('erro');
        const periodoDiv = document.getElementById('periodo');
        const diasCorridosDiv = document.getElementById('dias-corridos');
        const diasUteisComFeriadosDiv = document.getElementById('dias-uteis-com-feriados');
        const diasUteisDiv = document.getElementById('dias-uteis');
        
        // Limpar resultados
        periodoDiv.textContent = '';
        diasCorridosDiv.textContent = '-';
        diasUteisComFeriadosDiv.textContent = '-';
        diasUteisDiv.textContent = '-';
        
        // Mostrar mensagem de erro
        erroDiv.textContent = erro.message;
        erroDiv.classList.remove('d-none');
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Carregar feriados ao iniciar
    carregarFeriados();

    // Adicionar evento de clique ao botão
    const calcularBtn = document.getElementById('calcular');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularResultados);
        console.log('Evento de clique adicionado ao botão Calcular');
    } else {
        console.error('Botão de cálculo não encontrado!');
    }
}); 
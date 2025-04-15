import { carregarFeriados, isFeriado } from './modules/feriados.js';
import { calcularDiasUteis, formatarNumero } from './modules/calculoDatas.js';

document.addEventListener('DOMContentLoaded', () => {
    // Carregar feriados ao iniciar
    carregarFeriados();

    // Elementos do DOM
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    const calcularBtn = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    const erroDiv = document.getElementById('erro');
    const periodoDiv = document.getElementById('periodo');
    const diasCorridosDiv = document.getElementById('dias-corridos');
    const diasUteisComFeriadosDiv = document.getElementById('dias-uteis-com-feriados');
    const diasUteisDiv = document.getElementById('dias-uteis');

    // Função para calcular e exibir resultados
    function calcularResultados() {
        try {
            const inicio = new Date(dataInicial.value);
            const fim = new Date(dataFinal.value);

            if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
                throw new Error('Por favor, selecione datas válidas.');
            }

            if (inicio > fim) {
                throw new Error('A data inicial deve ser anterior à data final.');
            }

            // Formatar datas para exibição
            const formatoData = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const dataInicialFormatada = inicio.toLocaleDateString('pt-BR', formatoData);
            const dataFinalFormatada = fim.toLocaleDateString('pt-BR', formatoData);
            periodoDiv.textContent = `${dataInicialFormatada} a ${dataFinalFormatada}`;

            // Calcular dias corridos
            const diasCorridos = Math.floor((fim - inicio) / (1000 * 60 * 60 * 24)) + 1;
            diasCorridosDiv.textContent = formatarNumero(diasCorridos);
            
            // Calcular dias úteis (considerando feriados)
            const diasUteisComFeriados = calcularDiasUteis(inicio, fim, true, isFeriado);
            diasUteisComFeriadosDiv.textContent = formatarNumero(diasUteisComFeriados);
            
            // Calcular dias úteis (sem considerar feriados)
            const diasUteis = calcularDiasUteis(inicio, fim, false, isFeriado);
            diasUteisDiv.textContent = formatarNumero(diasUteis);

            // Esconder mensagem de erro se existir
            erroDiv.classList.add('d-none');
        } catch (erro) {
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

    // Adicionar evento de clique ao botão
    calcularBtn.addEventListener('click', calcularResultados);
}); 
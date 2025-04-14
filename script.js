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

            // Calcular dias corridos
            const diasCorridos = Math.floor((fim - inicio) / (1000 * 60 * 60 * 24)) + 1;
            
            // Calcular dias úteis (considerando feriados)
            const diasUteisComFeriados = calcularDiasUteis(inicio, fim, true, isFeriado);
            
            // Calcular dias úteis (sem considerar feriados)
            const diasUteis = calcularDiasUteis(inicio, fim, false, isFeriado);

            // Exibir resultados
            resultadoDiv.innerHTML = `
                <p>Dias Corridos: ${formatarNumero(diasCorridos)} dias</p>
                <p>Dias Úteis c/ Feriados: ${formatarNumero(diasUteisComFeriados)} dias</p>
                <p>Dias Úteis: ${formatarNumero(diasUteis)} dias</p>
            `;
            erroDiv.textContent = '';
        } catch (erro) {
            resultadoDiv.innerHTML = '';
            erroDiv.textContent = erro.message;
        }
    }

    // Adicionar evento de clique ao botão
    calcularBtn.addEventListener('click', calcularResultados);
}); 
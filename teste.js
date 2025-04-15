// Importar as funções dos módulos
import { carregarFeriados, isFeriado } from './modules/feriados.js';
import { calcularDiasUteis, formatarNumero } from './modules/calculoDatas.js';

// Função para testar o cálculo de dias entre datas
function testarCalculoDatas() {
    console.log('=== TESTES DE CÁLCULO DE DATAS ===');
    
    // Teste 1: Datas no mesmo mês
    const dataInicio1 = new Date(2023, 5, 1); // 1 de junho de 2023
    const dataFim1 = new Date(2023, 5, 15);   // 15 de junho de 2023
    
    console.log('\nTeste 1: Datas no mesmo mês');
    console.log(`Data inicial: ${dataInicio1.toLocaleDateString('pt-BR')}`);
    console.log(`Data final: ${dataFim1.toLocaleDateString('pt-BR')}`);
    
    const diasCorridos1 = Math.floor((dataFim1 - dataInicio1) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis1 = calcularDiasUteis(dataInicio1, dataFim1, false, isFeriado);
    const diasUteisComFeriados1 = calcularDiasUteis(dataInicio1, dataFim1, true, isFeriado);
    
    console.log(`Dias corridos: ${formatarNumero(diasCorridos1)}`);
    console.log(`Dias úteis: ${formatarNumero(diasUteis1)}`);
    console.log(`Dias úteis com feriados: ${formatarNumero(diasUteisComFeriados1)}`);
    
    // Teste 2: Datas em meses diferentes
    const dataInicio2 = new Date(2023, 5, 15); // 15 de junho de 2023
    const dataFim2 = new Date(2023, 6, 15);    // 15 de julho de 2023
    
    console.log('\nTeste 2: Datas em meses diferentes');
    console.log(`Data inicial: ${dataInicio2.toLocaleDateString('pt-BR')}`);
    console.log(`Data final: ${dataFim2.toLocaleDateString('pt-BR')}`);
    
    const diasCorridos2 = Math.floor((dataFim2 - dataInicio2) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis2 = calcularDiasUteis(dataInicio2, dataFim2, false, isFeriado);
    const diasUteisComFeriados2 = calcularDiasUteis(dataInicio2, dataFim2, true, isFeriado);
    
    console.log(`Dias corridos: ${formatarNumero(diasCorridos2)}`);
    console.log(`Dias úteis: ${formatarNumero(diasUteis2)}`);
    console.log(`Dias úteis com feriados: ${formatarNumero(diasUteisComFeriados2)}`);
    
    // Teste 3: Datas em anos diferentes
    const dataInicio3 = new Date(2023, 11, 15); // 15 de dezembro de 2023
    const dataFim3 = new Date(2024, 0, 15);     // 15 de janeiro de 2024
    
    console.log('\nTeste 3: Datas em anos diferentes');
    console.log(`Data inicial: ${dataInicio3.toLocaleDateString('pt-BR')}`);
    console.log(`Data final: ${dataFim3.toLocaleDateString('pt-BR')}`);
    
    const diasCorridos3 = Math.floor((dataFim3 - dataInicio3) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis3 = calcularDiasUteis(dataInicio3, dataFim3, false, isFeriado);
    const diasUteisComFeriados3 = calcularDiasUteis(dataInicio3, dataFim3, true, isFeriado);
    
    console.log(`Dias corridos: ${formatarNumero(diasCorridos3)}`);
    console.log(`Dias úteis: ${formatarNumero(diasUteis3)}`);
    console.log(`Dias úteis com feriados: ${formatarNumero(diasUteisComFeriados3)}`);
    
    // Teste 4: Verificar feriados
    console.log('\nTeste 4: Verificar feriados');
    
    // Testar alguns feriados conhecidos
    const natal = new Date(2023, 11, 25); // 25 de dezembro (Natal)
    const anoNovo = new Date(2024, 0, 1); // 1 de janeiro (Ano Novo)
    const diaTrabalho = new Date(2023, 4, 1); // 1 de maio (Dia do Trabalho)
    
    console.log(`É Natal (25/12/2023)? ${isFeriado(natal) ? 'Sim' : 'Não'}`);
    console.log(`É Ano Novo (01/01/2024)? ${isFeriado(anoNovo) ? 'Sim' : 'Não'}`);
    console.log(`É Dia do Trabalho (01/05/2023)? ${isFeriado(diaTrabalho) ? 'Sim' : 'Não'}`);
    
    // Teste 5: Verificar fins de semana
    console.log('\nTeste 5: Verificar fins de semana');
    
    // Função para verificar se é fim de semana
    function isFimDeSemana(data) {
        const dia = data.getDay();
        return dia === 0 || dia === 6; // 0 é domingo, 6 é sábado
    }
    
    const sabado = new Date(2023, 5, 3); // 3 de junho de 2023 (sábado)
    const domingo = new Date(2023, 5, 4); // 4 de junho de 2023 (domingo)
    const segunda = new Date(2023, 5, 5); // 5 de junho de 2023 (segunda)
    
    console.log(`É fim de semana (03/06/2023)? ${isFimDeSemana(sabado) ? 'Sim' : 'Não'}`);
    console.log(`É fim de semana (04/06/2023)? ${isFimDeSemana(domingo) ? 'Sim' : 'Não'}`);
    console.log(`É fim de semana (05/06/2023)? ${isFimDeSemana(segunda) ? 'Sim' : 'Não'}`);
}

// Função para testar a formatação de números
function testarFormatacaoNumeros() {
    console.log('\n=== TESTES DE FORMATAÇÃO DE NÚMEROS ===');
    
    const numeros = [1, 10, 100, 1000, 10000, 100000, 1000000];
    
    numeros.forEach(numero => {
        console.log(`${numero} formatado: ${formatarNumero(numero)}`);
    });
}

// Função principal para executar todos os testes
async function executarTestes() {
    console.log('Iniciando testes...');
    
    // Carregar feriados antes de executar os testes
    await carregarFeriados();
    
    // Executar os testes
    testarCalculoDatas();
    testarFormatacaoNumeros();
    
    console.log('\nTestes concluídos!');
}

// Executar os testes
executarTestes(); 
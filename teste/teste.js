// Importar as funções dos módulos
import { carregarFeriados, isFeriado } from '../modules/feriados.js';
import { calcularDiasUteis, formatarNumero } from '../modules/calculoDatas.js';

// Função para criar um elemento de resultado
function criarElementoResultado(titulo, conteudo) {
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'resultado-teste mb-4';
    
    const tituloElement = document.createElement('h3');
    tituloElement.className = 'titulo-teste';
    tituloElement.textContent = titulo;
    
    const conteudoElement = document.createElement('div');
    conteudoElement.className = 'conteudo-teste';
    conteudoElement.innerHTML = conteudo;
    
    resultadoDiv.appendChild(tituloElement);
    resultadoDiv.appendChild(conteudoElement);
    
    return resultadoDiv;
}

// Função para criar uma tabela de resultados
function criarTabelaResultados(cabecalhos, linhas) {
    const tabela = document.createElement('table');
    tabela.className = 'table table-striped table-bordered';
    
    // Cabeçalho
    const thead = document.createElement('thead');
    const trCabecalho = document.createElement('tr');
    
    cabecalhos.forEach(cabecalho => {
        const th = document.createElement('th');
        th.textContent = cabecalho;
        trCabecalho.appendChild(th);
    });
    
    thead.appendChild(trCabecalho);
    tabela.appendChild(thead);
    
    // Corpo
    const tbody = document.createElement('tbody');
    
    linhas.forEach(linha => {
        const tr = document.createElement('tr');
        
        linha.forEach(celula => {
            const td = document.createElement('td');
            td.innerHTML = celula;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    tabela.appendChild(tbody);
    
    return tabela;
}

// Função para testar o cálculo de dias entre datas
function testarCalculoDatas() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    
    // Teste 1: Datas no mesmo mês
    const dataInicio1 = new Date(2023, 5, 1); // 1 de junho de 2023
    const dataFim1 = new Date(2023, 5, 15);   // 15 de junho de 2023
    
    const diasCorridos1 = Math.floor((dataFim1 - dataInicio1) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis1 = calcularDiasUteis(dataInicio1, dataFim1, false, isFeriado);
    const diasUteisComFeriados1 = calcularDiasUteis(dataInicio1, dataFim1, true, isFeriado);
    
    const tabela1 = criarTabelaResultados(
        ['Métrica', 'Valor'],
        [
            ['Data Inicial', dataInicio1.toLocaleDateString('pt-BR')],
            ['Data Final', dataFim1.toLocaleDateString('pt-BR')],
            ['Dias Corridos', formatarNumero(diasCorridos1)],
            ['Dias Úteis', formatarNumero(diasUteis1)],
            ['Dias Úteis com Feriados', formatarNumero(diasUteisComFeriados1)]
        ]
    );
    
    const resultado1 = criarElementoResultado('Teste 1: Datas no mesmo mês', '');
    resultado1.querySelector('.conteudo-teste').appendChild(tabela1);
    resultadosDiv.appendChild(resultado1);
    
    // Teste 2: Datas em meses diferentes
    const dataInicio2 = new Date(2023, 5, 15); // 15 de junho de 2023
    const dataFim2 = new Date(2023, 6, 15);    // 15 de julho de 2023
    
    const diasCorridos2 = Math.floor((dataFim2 - dataInicio2) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis2 = calcularDiasUteis(dataInicio2, dataFim2, false, isFeriado);
    const diasUteisComFeriados2 = calcularDiasUteis(dataInicio2, dataFim2, true, isFeriado);
    
    const tabela2 = criarTabelaResultados(
        ['Métrica', 'Valor'],
        [
            ['Data Inicial', dataInicio2.toLocaleDateString('pt-BR')],
            ['Data Final', dataFim2.toLocaleDateString('pt-BR')],
            ['Dias Corridos', formatarNumero(diasCorridos2)],
            ['Dias Úteis', formatarNumero(diasUteis2)],
            ['Dias Úteis com Feriados', formatarNumero(diasUteisComFeriados2)]
        ]
    );
    
    const resultado2 = criarElementoResultado('Teste 2: Datas em meses diferentes', '');
    resultado2.querySelector('.conteudo-teste').appendChild(tabela2);
    resultadosDiv.appendChild(resultado2);
    
    // Teste 3: Datas em anos diferentes
    const dataInicio3 = new Date(2023, 11, 15); // 15 de dezembro de 2023
    const dataFim3 = new Date(2024, 0, 15);     // 15 de janeiro de 2024
    
    const diasCorridos3 = Math.floor((dataFim3 - dataInicio3) / (1000 * 60 * 60 * 24)) + 1;
    const diasUteis3 = calcularDiasUteis(dataInicio3, dataFim3, false, isFeriado);
    const diasUteisComFeriados3 = calcularDiasUteis(dataInicio3, dataFim3, true, isFeriado);
    
    const tabela3 = criarTabelaResultados(
        ['Métrica', 'Valor'],
        [
            ['Data Inicial', dataInicio3.toLocaleDateString('pt-BR')],
            ['Data Final', dataFim3.toLocaleDateString('pt-BR')],
            ['Dias Corridos', formatarNumero(diasCorridos3)],
            ['Dias Úteis', formatarNumero(diasUteis3)],
            ['Dias Úteis com Feriados', formatarNumero(diasUteisComFeriados3)]
        ]
    );
    
    const resultado3 = criarElementoResultado('Teste 3: Datas em anos diferentes', '');
    resultado3.querySelector('.conteudo-teste').appendChild(tabela3);
    resultadosDiv.appendChild(resultado3);
    
    // Teste 4: Verificar feriados
    const natal = new Date(2023, 11, 25); // 25 de dezembro (Natal)
    const anoNovo = new Date(2024, 0, 1); // 1 de janeiro (Ano Novo)
    const diaTrabalho = new Date(2023, 4, 1); // 1 de maio (Dia do Trabalho)
    
    const tabela4 = criarTabelaResultados(
        ['Data', 'É Feriado?'],
        [
            ['Natal (25/12/2023)', isFeriado(natal) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>'],
            ['Ano Novo (01/01/2024)', isFeriado(anoNovo) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>'],
            ['Dia do Trabalho (01/05/2023)', isFeriado(diaTrabalho) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>']
        ]
    );
    
    const resultado4 = criarElementoResultado('Teste 4: Verificar feriados', '');
    resultado4.querySelector('.conteudo-teste').appendChild(tabela4);
    resultadosDiv.appendChild(resultado4);
    
    // Teste 5: Verificar fins de semana
    function isFimDeSemana(data) {
        const dia = data.getDay();
        return dia === 0 || dia === 6; // 0 é domingo, 6 é sábado
    }
    
    const sabado = new Date(2023, 5, 3); // 3 de junho de 2023 (sábado)
    const domingo = new Date(2023, 5, 4); // 4 de junho de 2023 (domingo)
    const segunda = new Date(2023, 5, 5); // 5 de junho de 2023 (segunda)
    
    const tabela5 = criarTabelaResultados(
        ['Data', 'É Fim de Semana?'],
        [
            ['Sábado (03/06/2023)', isFimDeSemana(sabado) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>'],
            ['Domingo (04/06/2023)', isFimDeSemana(domingo) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>'],
            ['Segunda (05/06/2023)', isFimDeSemana(segunda) ? '<span class="badge bg-success">Sim</span>' : '<span class="badge bg-danger">Não</span>']
        ]
    );
    
    const resultado5 = criarElementoResultado('Teste 5: Verificar fins de semana', '');
    resultado5.querySelector('.conteudo-teste').appendChild(tabela5);
    resultadosDiv.appendChild(resultado5);
}

// Função para testar a formatação de números
function testarFormatacaoNumeros() {
    const resultadosDiv = document.getElementById('resultados');
    
    const numeros = [1, 10, 100, 1000, 10000, 100000, 1000000];
    const linhas = numeros.map(numero => [numero, formatarNumero(numero)]);
    
    const tabela = criarTabelaResultados(
        ['Número Original', 'Número Formatado'],
        linhas
    );
    
    const resultado = criarElementoResultado('Teste de Formatação de Números', '');
    resultado.querySelector('.conteudo-teste').appendChild(tabela);
    resultadosDiv.appendChild(resultado);
}

// Função para criar um botão de teste interativo
function criarBotaoTesteInterativo() {
    const resultadosDiv = document.getElementById('resultados');
    
    const botaoDiv = document.createElement('div');
    botaoDiv.className = 'text-center mb-4';
    
    const botao = document.createElement('button');
    botao.className = 'btn btn-primary';
    botao.textContent = 'Executar Teste Interativo';
    botao.addEventListener('click', () => {
        const dataInicial = prompt('Digite a data inicial (DD/MM/AAAA):');
        const dataFinal = prompt('Digite a data final (DD/MM/AAAA):');
        
        if (dataInicial && dataFinal) {
            const partesInicial = dataInicial.split('/');
            const partesFinal = dataFinal.split('/');
            
            if (partesInicial.length === 3 && partesFinal.length === 3) {
                const inicio = new Date(
                    parseInt(partesInicial[2]), 
                    parseInt(partesInicial[1]) - 1, 
                    parseInt(partesInicial[0])
                );
                
                const fim = new Date(
                    parseInt(partesFinal[2]), 
                    parseInt(partesFinal[1]) - 1, 
                    parseInt(partesFinal[0])
                );
                
                if (!isNaN(inicio.getTime()) && !isNaN(fim.getTime())) {
                    const diasCorridos = Math.floor((fim - inicio) / (1000 * 60 * 60 * 24)) + 1;
                    const diasUteis = calcularDiasUteis(inicio, fim, false, isFeriado);
                    const diasUteisComFeriados = calcularDiasUteis(inicio, fim, true, isFeriado);
                    
                    const tabela = criarTabelaResultados(
                        ['Métrica', 'Valor'],
                        [
                            ['Data Inicial', inicio.toLocaleDateString('pt-BR')],
                            ['Data Final', fim.toLocaleDateString('pt-BR')],
                            ['Dias Corridos', formatarNumero(diasCorridos)],
                            ['Dias Úteis', formatarNumero(diasUteis)],
                            ['Dias Úteis com Feriados', formatarNumero(diasUteisComFeriados)]
                        ]
                    );
                    
                    const resultado = criarElementoResultado('Teste Interativo', '');
                    resultado.querySelector('.conteudo-teste').appendChild(tabela);
                    
                    // Inserir no topo dos resultados
                    resultadosDiv.insertBefore(resultado, resultadosDiv.firstChild);
                } else {
                    alert('Datas inválidas!');
                }
            } else {
                alert('Formato de data inválido! Use DD/MM/AAAA');
            }
        }
    });
    
    botaoDiv.appendChild(botao);
    resultadosDiv.insertBefore(botaoDiv, resultadosDiv.firstChild);
}

// Função principal para executar todos os testes
async function executarTestes() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '<div class="alert alert-info">Carregando testes...</div>';
    
    try {
        // Carregar feriados antes de executar os testes
        await carregarFeriados();
        
        // Limpar a mensagem de carregamento
        resultadosDiv.innerHTML = '';
        
        // Adicionar botão de teste interativo
        criarBotaoTesteInterativo();
        
        // Executar os testes
        testarCalculoDatas();
        testarFormatacaoNumeros();
        
        // Adicionar mensagem de conclusão
        const conclusaoDiv = document.createElement('div');
        conclusaoDiv.className = 'alert alert-success mt-4';
        conclusaoDiv.textContent = 'Testes concluídos com sucesso!';
        resultadosDiv.appendChild(conclusaoDiv);
    } catch (erro) {
        resultadosDiv.innerHTML = `<div class="alert alert-danger">Erro ao executar testes: ${erro.message}</div>`;
    }
}

// Executar os testes quando a página carregar
document.addEventListener('DOMContentLoaded', executarTestes); 
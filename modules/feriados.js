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

// Array para armazenar os feriados
let feriados = [];

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

// Exportar funções e variáveis
export { carregarFeriados, isFeriado }; 
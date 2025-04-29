function gerarCPF() {
    const rand = () => Math.floor(Math.random() * 9);
    let n = [];
    for (let i = 0; i < 9; i++) n.push(rand());

    let d1 = 0;
    for (let i = 0; i < 9; i++) d1 += n[i] * (10 - i);
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;
    n.push(d1);

    let d2 = 0;
    for (let i = 0; i < 10; i++) d2 += n[i] * (11 - i);
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;
    n.push(d2);

    return n.join('');
}

function isCPFField(el) {
    const attrs = [el.name, el.id, el.placeholder, el.getAttribute('formcontrolname'), el.getAttribute('ng-reflect-name')];
    return attrs.some(attr => attr && attr.toLowerCase().includes("cpf"));
}

function inserirBotao(campo) {
    if (campo.dataset.cpfSugestao) return;
    campo.dataset.cpfSugestao = "true";

    const botao = document.createElement("button");
    botao.textContent = "Gerar CPF";
    botao.type = "button"; // Define o tipo do botão como "button"
    botao.style.marginLeft = "8px";
    botao.style.fontSize = "12px";
    botao.style.cursor = "pointer";

    botao.onclick = () => {
        campo.value = gerarCPF();
        campo.dispatchEvent(new Event('input', { bubbles: true }));
    };

    campo.parentNode.insertBefore(botao, campo.nextSibling);
}

function gerarNome() {
    const nomes = ["João", "Maria", "Pedro", "Ana", "Lucas", "Carla", "Gabriel", "Fernanda", "Rafael", "Juliana", "Thiago", "Larissa", "Bruno", "Camila", "Diego", "Isabela", "Felipe", "Patrícia", "Leonardo", "Vanessa"];
    const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Almeida", "Ferreira", "Rodrigues", "Martins", "Barbosa", "Lima", "Gomes", "Ribeiro", "Carvalho", "Teixeira", "Mendes", "Nascimento", "Araujo", "Monteiro"];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
}

function isNomeField(el) {
    const attrs = [el.name, el.id, el.placeholder, el.getAttribute('formcontrolname'), el.getAttribute('ng-reflect-name')];
    return attrs.some(attr => attr && attr.toLowerCase().includes("nome"));
}

function inserirBotaoNome(campo) {
    if (campo.dataset.nomeSugestao) return;
    campo.dataset.nomeSugestao = "true";

    const botao = document.createElement("button");
    botao.textContent = "Gerar Nome";
    botao.type = "button"; // Define o tipo do botão como "button"
    botao.style.marginLeft = "8px";
    botao.style.fontSize = "12px";
    botao.style.cursor = "pointer";

    botao.onclick = () => {
        campo.value = gerarNome();
        campo.dispatchEvent(new Event('input', { bubbles: true }));
    };

    campo.parentNode.insertBefore(botao, campo.nextSibling);
}

function procurarCampos() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        if (isCPFField(input)) {
            inserirBotao(input);
        }
        if (isNomeField(input)) {
            inserirBotaoNome(input);
        }
    });
}

console.log("CPF Fake Generator: content script running...");
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => procurarCampos());
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

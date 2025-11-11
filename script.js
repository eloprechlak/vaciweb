// =======================
// 🧭 LOGIN FIXO
// =======================
const usuarioValido = {
    email: "adm@gmail.com",
    senha: "123456"
};

function validarLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById("username").value.trim();
    const senhaInput = document.getElementById("senhaLogin").value.trim();
    const msg = document.getElementById("msg");

    if (!emailInput || !senhaInput) {
        if (msg) {
            msg.innerText = "⚠️ Preencha todos os campos!";
            msg.style.color = "red";
        }
        return;
    }

    if (emailInput === usuarioValido.email && senhaInput === usuarioValido.senha) {
        if (msg) {
            msg.innerText = "✅ Login realizado com sucesso!";
            msg.style.color = "green";
        }
        setTimeout(() => {
            window.location.href = "./principal.html"; // página principal
        }, 500);
    } else {
        if (msg) {
            msg.innerText = "❌ Email ou senha incorretos!";
            msg.style.color = "red";
        }
    }
}

// Adiciona evento ao formulário de login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", validarLogin);
}

// =======================
// 🧭 NAVEGAÇÃO ENTRE TELAS
// =======================
function goHome() { window.location.href = "./index.html"; }
function irParaLogin() { window.location.href = "login.html"; }
function irParaPrincipal() { window.location.href = "./principal.html"; }
function irParaCadastro() { window.location.href = "./cadastro.html"; }
function irBebe() { window.location.href = "./bebe.html"; }
function irAdolescente() { window.location.href = "./adolecente.html"; }
function irAdulto() { window.location.href = "./adultoidoso.html"; }
function irGestante() { window.location.href = "./gestante.html"; }
function irJogo() { window.location.href = "./jogo.html"; }

// =======================
// 📚 BOTÃO "SAIBA MAIS"
// =======================
const saibaMaisBtn = document.getElementById("saibaMais");
if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener("click", () => {
        alert("Em breve você será redirecionado para mais informações sobre vacinação!");
    });
}

// =======================
// 🔄 CARROSSEL DE IMAGENS
// =======================
const slides = document.querySelectorAll('.carousel-image');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Muda a cada 4 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}, 4000);

// Inicializa o primeiro slide
showSlide(currentIndex);

// Este arquivo contém todo o código necessário para executar as ações de criptografar o texto do usuário, descriptografá-lo, copiá-lo e excluí-lo após a cópia.

// Seleciona elementos do DOM
let resultado = document.querySelector("#resultado");
let btnCriptografar = document.querySelector("#criptografar");
let resultadoInicial = document.querySelector("#decoder-initial-result");
let btnCopiar = document.querySelector("#copiar");
let btnDescriptografar = document.querySelector("#descriptografar");

// Chaves de substituição para criptografar e descriptografar
const chaves = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

// Função para validar o texto de entrada
function validarTexto(texto) {
  let maiusculas = /[A-Z]/g;
  let caracteresEspeciais = /[áéíóúàèìòùâêîôûãõ]/g;

  return texto.match(maiusculas) || texto.match(caracteresEspeciais);
}

// Função para criptografar o texto
function criptografar(textoUsuario) {
  let textoCriptografado = textoUsuario;
  for (const chave in chaves) {
    textoCriptografado = textoCriptografado.replaceAll(chave, chaves[chave]);
  }
  return textoCriptografado;
}

// Função para descriptografar o texto
function descriptografar(textoUsuario) {
  let textoDescriptografado = textoUsuario;
  for (const chave in chaves) {
    textoDescriptografado = textoDescriptografado.replaceAll(
      chaves[chave],
      chave
    );
  }
  return textoDescriptografado;
}

// Adiciona evento de clique para criptografar o texto
btnCriptografar.addEventListener("click", () => {
  let textArea = document.querySelector("#texto");
  let textoUsuario = textArea.value;
  textArea.classList.remove("error");

  // Verifica se o texto é válido
  if (!validarTexto(textoUsuario)) {
    // Criptografa o texto e exibe o resultado
    let textoCriptografado = criptografar(textoUsuario);
    resultado.value = textoCriptografado;
    if (resultado.value) {
      resultadoInicial.style.display = "none";
      resultado.style.display = "block";
      btnCopiar.style.display = "block";
    }
  } else {
    // Exibe mensagem de erro se o texto não for válido
    textArea.value = "";
    textArea.classList.add("error");
    textArea.placeholder = "Só são permitidas letras minúsculas e sem acentos.";
  }
});

// Adiciona evento de clique para copiar o texto criptografado
btnCopiar.addEventListener("click", async () => {
  let textoCopiado = resultado.value;

  try {
    // Copia o texto para a área de transferência
    await navigator.clipboard.writeText(textoCopiado);
    resultado.value = ""; // Apaga o conteúdo após a cópia
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Texto copiado",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    console.error("Erro ao copiar o texto: ", err);
  }
});

// Adiciona evento de clique para descriptografar o texto
btnDescriptografar.addEventListener("click", () => {
  let textoUsuario = document.querySelector("#texto").value;
  let textoDescriptografado = descriptografar(textoUsuario);

  resultado.value = textoDescriptografado;

  if (resultado.value) {
    resultadoInicial.style.display = "none";
    resultado.style.display = "block";
    btnCopiar.style.display = "block";
  }
});

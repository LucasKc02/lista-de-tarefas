$(document).ready(function () {

  let tarefas = [];

  function renderizar() {
    $("#lista").empty();

    tarefas.forEach((tarefa, index) => {
      const tarefaHTML = `
        <div class="tarefa" data-index="${index}">
          
          <div class="titulo ${tarefa.concluida ? 'concluida' : ''}">
            ${tarefa.texto}
          </div>

          <input type="text" class="editarInput" value="${tarefa.texto}" style="display:none; margin-top:5px;">

          <div class="botoes">
            <button class="concluir">Concluir</button>
            <button class="editar">Editar</button>
            <button class="remover">Remover</button>
          </div>

          <div class="acoes-edicao" style="display:none; margin-top:5px;">
            <button class="salvarEdicao">Salvar</button>
            <button class="cancelarEdicao">Cancelar</button>
          </div>

          <div class="descricao">
            <textarea class="textoDescricao">${tarefa.descricao}</textarea>
            <br>
            <button class="salvar">Salvar</button>
            <button class="fechar">Fechar</button>
          </div>

        </div>
      `;

      $("#lista").append(tarefaHTML);
    });
  }

  $("#adicionar").click(function () {
    const texto = $("#novaTarefa").val().trim();

    if (texto !== "") {
      tarefas.push({
        texto: texto,
        descricao: "",
        concluida: false
      });

      $("#novaTarefa").val("");
      renderizar();
    }
  });

  $("#lista").on("click", ".editar", function () {
    const container = $(this).closest(".tarefa");

    container.find(".titulo").hide();
    container.find(".editarInput").show().focus();
    container.find(".acoes-edicao").show();
  });

  $("#lista").on("click", ".salvarEdicao", function () {
    const container = $(this).closest(".tarefa");
    const index = container.data("index");
    const novoTexto = container.find(".editarInput").val().trim();

    if (novoTexto === "") {
      alert("A tarefa não pode ficar vazia!");
      return;
    }

    tarefas[index].texto = novoTexto;
    renderizar();
  });

  $("#lista").on("click", ".cancelarEdicao", function () {
    renderizar();
  });

  $("#lista").on("click", ".concluir", function () {
    const index = $(this).closest(".tarefa").data("index");
    tarefas[index].concluida = !tarefas[index].concluida;
    renderizar();
  });

  $("#lista").on("click", ".remover", function () {
    const index = $(this).closest(".tarefa").data("index");
    tarefas.splice(index, 1);
    renderizar();
  });

});
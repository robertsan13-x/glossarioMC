$(document).ready(function() {
    // Carregar o glossário do arquivo JSON local
    $.getJSON("./database/base.json", function (data) {
        var formulario = $('.js-formulario');

        // Preencher as opções do select com os títulos do JSON
        var select = $('select[name="termo"]');
        $.each(data, function(index, item) {
            select.append($('<option>', {
                value: item.id,
                text: item.titulo
            }));
        });

        // Adicionar evento de envio do formulário
        formulario.submit(function(event) {
            event.preventDefault(); // Impedir o envio padrão do formulário

            var termoSelecionadoId = $(this).find('select[name="termo"]').val(); // Obter o ID do termo selecionado
            var resultado = $('.js-resultado');

            // Buscar o termo correspondente no JSON
            var termo = data.find(item => item.id == termoSelecionadoId);

            // Se o termo for encontrado, exibir a definição
            if (termo) {
                resultado.find('.js-resultado__titulo').text(termo.titulo);
                resultado.find('.js-resultado__descricao').text(termo.descricao);
                resultado.removeClass('display-none'); // Exibir a seção de resultados
            } else {
                // Se o termo não for encontrado, exibir mensagem de erro
                resultado.find('.js-resultado__titulo').text('Palavra não encontrada, verifique a seleção e tente novamente!');
                resultado.find('.js-resultado__descricao').text('');
                resultado.removeClass('display-none'); // Exibir a seção de resultados
            }
        });
    });
});
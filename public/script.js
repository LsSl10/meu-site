// script.js — interações: carregar/Enviar comentários e contato; CTAs
document.addEventListener('DOMContentLoaded', () => {
  const listaEl = document.getElementById('listaComentarios');
  const nomeInput = document.getElementById('c-nome');
  const cidadeInput = document.getElementById('c-cidade');
  const textoInput = document.getElementById('c-texto');
  const btnEnviar = document.getElementById('enviarComentario');
  const anoEl = document.getElementById('ano');

  anoEl.textContent = new Date().getFullYear();

  // carregar comentários
  async function carregarComentarios() {
    try {
      const res = await fetch('/api/comentarios');
      const data = await res.json();
      listaEl.innerHTML = '';
      data.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comentario-item';
        div.innerHTML = `<strong>${escapeHtml(c.nome)}</strong> <small class="muted">${escapeHtml(c.cidade || '')}</small><p>${escapeHtml(c.texto)}</p>`;
        listaEl.appendChild(div);
      });
    } catch (err) {
      console.error('Erro ao carregar comentários', err);
      listaEl.innerHTML = '<p>Não foi possível carregar comentários.</p>';
    }
  }

  carregarComentarios();

  // enviar comentário
  btnEnviar.addEventListener('click', async () => {
    const nome = nomeInput.value.trim();
    const cidade = cidadeInput.value.trim();
    const texto = textoInput.value.trim();
    if (!nome || !texto) { alert('Preencha nome e comentário.'); return; }

    try {
      const res = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ nome, cidade, texto })
      });
      const j = await res.json();
      if (j.sucesso) {
        nomeInput.value = ''; cidadeInput.value = ''; textoInput.value = '';
        carregarComentarios();
        alert('Comentário enviado — obrigado!');
      } else {
        alert('Erro: ' + (j.erro || 'Não foi possível enviar.'));
      }
    } catch (e) {
      alert('Erro ao enviar comentário.');
      console.error(e);
    }
  });

  // contato (form)
  const formContato = document.getElementById('formContato');
  formContato.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(formContato);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const j = await res.json();
      if (j.sucesso) {
        alert(j.mensagem || 'Mensagem enviada — obrigado!');
        formContato.reset();
      } else {
        alert('Erro: ' + (j.erro || 'Não enviado.'));
      }
    } catch (err) {
      alert('Erro ao enviar contato.');
      console.error(err);
    }
  });

  // compras (exemplo) — redireciona para placeholder
  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.dataset.plan || 'Plano';
      // aqui você pode inserir link de checkout (MercadoPago / Stripe / PagSeguro)
      const confirmMsg = `Você será redirecionado para pagar o plano: ${plan}. Deseja continuar?`;
      if (confirm(confirmMsg)) {
        // exemplo: abrir link de checkout (substitua abaixo)
        window.location.href = 'https://suapaginadecheckout.exemplo';
      }
    });
  });

  // util
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
  }
});

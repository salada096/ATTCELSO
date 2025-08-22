 let cadastros = [];

        // Formatação do telefone
        document.getElementById('telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 10) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
                e.target.value = value;
            }
        });

        // Validação em tempo real
        function validarCampo(campo, errorId, validacao) {
            const errorDiv = document.getElementById(errorId);
            
            campo.addEventListener('blur', function() {
                if (!validacao(this.value)) {
                    errorDiv.style.display = 'block';
                    this.style.borderColor = '#dc3545';
                } else {
                    errorDiv.style.display = 'none';
                    this.style.borderColor = '#28a745';
                }
            });

            campo.addEventListener('input', function() {
                if (validacao(this.value)) {
                    errorDiv.style.display = 'none';
                    this.style.borderColor = '#28a745';
                }
            });
        }

        // Configurar validações
        validarCampo(
            document.getElementById('nome'),
            'nomeError',
            value => value.trim().length >= 2
        );

        validarCampo(
            document.getElementById('email'),
            'emailError',
            value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        );

        validarCampo(
            document.getElementById('telefone'),
            'telefoneError',
            value => value.replace(/\D/g, '').length >= 10
        );

        // Submissão do formulário
        document.getElementById('cadastroForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            
            // Validações finais
            if (nome.length < 2 || !email.includes('@') || telefone.replace(/\D/g, '').length < 10) {
                alert('Por favor, preencha todos os campos corretamente.');
                return;
            }
            
            // Verificar se email já existe
            if (cadastros.some(c => c.email === email)) {
                alert('Este e-mail já está cadastrado!');
                return;
            }
            
            // Adicionar ao array
            cadastros.push({
                nome: nome,
                email: email,
                telefone: telefone,
                data: new Date().toLocaleString('pt-BR')
            });
            
            // Mostrar mensagem de sucesso
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
            // Limpar formulário
            this.reset();
            
            // Atualizar lista de cadastros
            atualizarListaCadastros();
            
            // Resetar estilos dos campos
            const inputs = this.querySelectorAll('input');
            inputs.forEach(input => {
                input.style.borderColor = '#e1e5e9';
            });
        });

        function atualizarListaCadastros() {
            const lista = document.getElementById('listaCadastros');
            const container = document.getElementById('cadastrosLista');
            
            if (cadastros.length === 0) {
                container.style.display = 'none';
                return;
            }
            
            container.style.display = 'block';
            
            lista.innerHTML = cadastros.map((cadastro, index) => `
                <div class="cadastro-item">
                    <h3>${cadastro.nome}</h3>
                    <p><strong>E-mail:</strong> ${cadastro.email}</p>
                    <p><strong>Telefone:</strong> ${cadastro.telefone}</p>
                    <p><strong>Cadastrado em:</strong> ${cadastro.data}</p>
                </div>
            `).join('');
        }

       
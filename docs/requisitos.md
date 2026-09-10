# Requisitos — DJ Rodrigão Playlist

Atualizado em 10/09/2026. Baseado na documentação original fornecida pelo responsável e nas decisões posteriores do projeto. “Implementado” descreve o código existente; não significa aprovação em todos os aparelhos e serviços reais.

## 1. Objetivo e público

Permitir que o contratante informe antecipadamente ao DJ Rodrigão quais músicas gostaria de ouvir, evitando pedidos dispersos em mensagens. O site também compõe o portfólio profissional do desenvolvedor.

O contratante recebe o mesmo link inicial enviado aos demais clientes, normalmente junto ao orçamento. Não precisa criar conta. A v1 não prevê convidados colaborando ou gerenciamento de histórico de eventos.

Persona de referência: Mariana, 29 anos, organizando um aniversário. Acessa principalmente pelo celular e precisa pesquisar, revisar e enviar suas preferências com poucas etapas.

## 2. Requisitos funcionais

| ID | Requisito e comportamento acordado | Estado |
| --- | --- | --- |
| RF01 | Buscar músicas por nome e/ou artista usando o iTunes. | Implementado. |
| RF02 | Mostrar capa, título, artista e prévia de até 30 segundos quando disponível. Ao iniciar outra prévia, pausar a anterior; informar indisponibilidade ou erro. | Implementado; validar catálogo e reprodução em dispositivos reais. |
| RF03 | Adicionar músicas, impedindo repetição do mesmo `trackId`. | Implementado. |
| RF04 | Remover músicas adicionadas. | Implementado; remoções também são persistidas. |
| RF05 | Mostrar a seleção em seção própria: barra inferior expansível nas telas menores e painel aberto à direita a partir de 1024 px. | Implementado. |
| RF06 | Preparar mensagem para o WhatsApp com lista numerada de músicas/artistas e nome opcional. Confirmação manual; preservar a seleção ao abrir o link. | Implementado; entrega real pendente de validação. |
| RF07 | Salvar músicas e nome no navegador e recuperar ao recarregar ou reabrir na mesma origem/perfil. | Implementado com `localStorage`. |
| RF08 | Informar carregamento, busca vazia, nenhum resultado e erro. Considerar apenas a busca mais recente e interromper após 20 segundos sem conclusão. | Implementado. |
| RF09 | Permitir nomear a festa opcionalmente. | Implementado, incluindo persistência e mensagem. |
| RF10 | Mostrar “Abrir no Spotify” nos resultados, pesquisando título e artista. O site não exige autenticação do Spotify. | Implementado; o destino é controlado pelo Spotify. |

Não há limite de músicas definido pelo produto, ordem de preferência ou dados obrigatórios da festa. A ordem atual é a de adição; não existe reordenação manual. Registros distintos do iTunes podem ter nomes iguais e identificadores diferentes.

## 3. Requisitos não funcionais

| ID | Requisito | Estado e limites de validação |
| --- | --- | --- |
| RNF01 | Interface responsiva com prioridade ao celular. | Implementada e conferida em tamanhos simulados; teclado e aparelhos físicos pendentes. |
| RNF02 | Sem cadastro ou login do cliente. | Atendido. |
| RNF03 | Identidade em preto, cinza escuro e amarelo, com aparência de evento noturno. | Implementada com CSS próprio e variáveis compartilhadas. |
| RNF04 | Componentes reutilizáveis e boas práticas React. | Componentes separados; `CardMusica` reutilizado na busca. O item da playlist tem JSX próprio. Lint e build passaram. |
| RNF05 | Funcionar no Chrome e Safari móveis, no mínimo. | Pendente de validação nesses ambientes; testes automatizados executados no Edge. |
| RNF06 | Busca sem travamentos perceptíveis e resposta adequada. | Requisição assíncrona, cancelamento e timeout implementados; experiência com rede real ainda precisa de avaliação. |
| RNF07 | Deploy público com endereço estável para compartilhar. | Pendente. O repositório no GitHub não substitui a publicação do site. |

## 4. Escopo da v1 e evoluções

A v1 inclui pesquisa no iTunes, prévias, montagem da seleção, nome opcional, persistência local, pesquisa externa no Spotify, envio manual pelo WhatsApp e interface responsiva. Não exige instalação de aplicativo para acessar o site.

Fora da v1:

- “Continuar em outro aparelho”: proposta aceita como evolução, usando link exclusivo por festa e armazenamento online, sem cadastro. Não implementado.
- Dashboard do DJ, histórico e múltiplas festas gerenciadas por cliente.
- Cadastro/login de usuários.
- Criação automática de playlists na conta Spotify do DJ.
- Notificações automáticas fora do WhatsApp.

Prazo de retenção e regras de gerenciamento das futuras festas online ainda não foram definidos.

## 5. Fluxo do contratante

1. Receber o link geral junto ao orçamento.
2. Abrir a página, com “DJ Rodrigão” e “Monte a playlist da sua festa”.
3. Recuperar automaticamente nome e seleção salvos nesse navegador, quando houver.
4. Pesquisar música/artista e, opcionalmente, ouvir a prévia ou abrir o Spotify.
5. Adicionar músicas e revisar a seleção, removendo itens se necessário.
6. Preencher o nome da festa, se desejar.
7. Acionar “Enviar playlist pro DJ”, disponível apenas com ao menos uma música.
8. Revisar e confirmar manualmente a mensagem no WhatsApp.

A documentação original previa boas-vindas com instruções. Hoje há apenas o cabeçalho e subtítulo; a necessidade de instruções adicionais ainda deve ser confirmada.

Mensagem aprovada (dados de exemplo):

```text
Olá, DJ Rodrigão! Estas são as músicas que gostaria de ouvir na festa.

Festa: Aniversário da Mariana

1. Nome da música — Artista
2. Nome da música — Artista
```

Destinatário: **+55 (11) 98782-3418**. A linha da festa é omitida quando o campo está vazio ou contém apenas espaços. Abrir o WhatsApp não comprova envio da mensagem.

## 6. Interface acordada

- A partir de 1024 px: área principal de até 1440 px, busca à esquerda e playlist à direita, proporção 60%/40% descontado o espaço entre colunas.
- A grade usa largura mínima de 240 px por card. Nos testes: dois cards em 1024/1280 px e três em 1366/1440/1920 px.
- Até 599 px: capa de 72 × 72 px ao lado das informações, áudio e botão abaixo.
- Abaixo de 1024 px: barra expansível e botões principais com altura mínima de 44 px. “Buscar” preenche a linha quando não cabe junto ao campo.
- Na playlist aberta, nome e envio ficam fora da área de rolagem das músicas.
- Com pouca altura nas telas menores, o painel pode ocupar até 95% da altura dinâmica. Isso não comprova compatibilidade com teclados virtuais reais.

## 7. Arquitetura atual

React 19, Vite, JavaScript/JSX, CSS e ESLint. Sem backend próprio, autenticação ou banco remoto na v1.

| Parte | Responsabilidade |
| --- | --- |
| `App.jsx` | Estado `{ playlist, name }`, adição/remoção e persistência. |
| `BuscaMusica` | `fetch`, mensagens, cancelamento e controle de uma prévia por vez. |
| `CardMusica` | Capa, título, artista, Spotify, áudio e adição. |
| `MinhaPlaylist` | Nome, seleção, remoção e painel responsivo. |
| `BotaoEnviarWhatsApp` | Texto numerado e link `wa.me` com mensagem codificada. |
| `styles/variables.css` | Paleta, fontes e arredondamentos. |

Fluxo: busca → resposta do iTunes → resultados → seleção no `App` → `localStorage` → mensagem preparada para o WhatsApp.

Chave local: `dj-rodrigao:festa`. A recuperação depende da mesma origem (protocolo, domínio e porta) e navegador/perfil. Limpar os dados remove a seleção; não existe sincronização automática entre aparelhos ou abas.

## 8. Riscos e pendências conhecidas

| Situação | Comportamento atual / pendência |
| --- | --- |
| Música não encontrada | Aviso para tentar outro nome ou artista. |
| Busca falha ou demora | Mensagem de erro ou timeout; permite buscar novamente. |
| Prévia ausente ou falha | Aviso; adição e Spotify continuam disponíveis. |
| Armazenamento bloqueado, cheio ou inválido | Exceções capturadas e dados inválidos tratados. Falhas registradas no console; não há aviso visual de salvamento. |
| Fechar sem enviar | Recupera nome e músicas se o armazenamento local estiver disponível. |
| Acessar outra origem/aparelho | Não recupera automaticamente a seleção na v1. |
| Playlist muito longa | Sem limite no produto. Avaliação do tamanho do link/mensagem nos serviços reais ainda pendente. |
| Serviços externos ou futura hospedagem indisponíveis | Validar disponibilidade e fluxo antes do uso com clientes reais. |

## 9. Validação e próximos passos

Verificações realizadas na versão local:

- [x] ESLint e build de produção.
- [x] Busca vazia, nenhum resultado, erros de rede/HTTP, resposta inválida e buscas consecutivas com dados simulados.
- [x] Reprodução de áudio de teste, pausa da prévia anterior e limite de 30 segundos.
- [x] Recuperação após recarregar/reabrir, remoção persistida e dados locais inválidos.
- [x] Mensagem do WhatsApp com/sem nome, destinatário e preservação da seleção; destino interceptado, sem envio real.
- [x] Layouts de celular, tablet e computador em tamanhos simulados no Edge.

Pendências:

- [ ] Validar iTunes, prévias, Spotify e envio manual no WhatsApp com serviços reais.
- [ ] Testar Chrome/Android e Safari/iPhone, incluindo teclado virtual e orientação.
- [ ] Confirmar se o cabeçalho atual atende à apresentação de boas-vindas.
- [ ] Publicar o site e registrar a URL estável no README.
- [ ] Versionar testes reproduzíveis e configurar execução automática de lint/build como manutenção do repositório.

Os scripts de navegador usados até aqui foram executados fora do repositório. Não há suíte versionada nem comando `npm test` no momento.

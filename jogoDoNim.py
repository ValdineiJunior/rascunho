def computador_escolhe_jogada(n, m):
    jogada = 1
    while jogada <= m:
        if (n - jogada) % (m + 1) == 0:
            return jogada
        jogada += 1
    return m

def usuario_escolhe_jogada(n, m):
    jogada_valida = False
    while not jogada_valida:
        jogada = int(input("Quantas peças você vai tirar? "))
        if jogada < 1 or jogada > m or jogada > n :
            print("Jogada inválida. Ela deve ser maior que 0 e menor ou igual há",m,"")
        else:
            jogada_valida = True
    return jogada

def partida():
    n = 0
    m = 0
    while( n <= 0 or m <= 0 ):
        n = int(input("Quantas peças? "))
        m = int(input("Limite de peças por jogada? "))
        if ( n <= 0 or m <= 0 ):
            print("Quantidades invalidas, elas devem ser maiores do que 0")
    if n % (m + 1) == 0:
        print("Você começa!")
        jogador = 1
    else:
        print("Computador começa!")
        jogador = 0

    while n > 0:
        if jogador == 0:
            jogada = computador_escolhe_jogada(n, m)
            jogador = 1
            print("O computador tirou", jogada, "peça(s).")
        else:
            jogada = usuario_escolhe_jogada(n, m)
            jogador = 0
            print("Você tirou", jogada, "peça(s).")

        n -= jogada
        print("Restam", n, "peças no tabuleiro.\n")

    if jogador == 0:
        print("Você ganhou!")
        return "Você ganhou!"
    else:
        print("O computador ganhou!")
        return "O computador ganhou!"

def campeonato():
    placar_usuario = 0
    placar_computador = 0

    for _ in range(3):
        print("== Novo Jogo ==")
        resultado = partida()

        if resultado == "Você ganhou!":
            placar_usuario += 1
        elif resultado == "O computador ganhou!":
            placar_computador += 1

    print("== Placar Final ==")
    print("Você", placar_usuario, "X", placar_computador, "Computador")


print("Bem-vindo ao Jogo do NIM!")

opcao = int(input("Digite 1 para jogar uma partida isolada ou 2 para um campeonato: "))

if opcao == 1:
    print("\n== Partida Isolada ==")
    partida()
elif opcao == 2:
    print("\n== Campeonato ==")
    campeonato()
else:
    print("Opção inválida. Encerrando o jogo.")

import re

def le_assinatura():
    print("Bem-vindo ao detector automático de COH-PIAH.")
    print("Informe a assinatura típica de um aluno infectado:")
    
    wal = float(input("Entre o tamanho médio de palavra: "))
    ttr = float(input("Entre a relação Type-Token: "))
    hlr = float(input("Entre a Razão Hapax Legomana: "))
    sal = float(input("Entre o tamanho médio de sentença: "))
    sac = float(input("Entre a complexidade média da sentença: "))
    pal = float(input("Entre o tamanho médio de frase: "))
    
    return [wal, ttr, hlr, sal, sac, pal]

def le_textos():
    i = 1
    textos = []
    texto = input("Digite o texto " + str(i) + " (aperte enter para sair): ")
    while texto:
        textos.append(texto)
        i += 1
        texto = input("Digite o texto " + str(i) + " (aperte enter para sair): ")
    return textos

def separa_sentencas(texto):
    sentencas = re.split(r'[.!?]+', texto)
    if sentencas[-1] == '':
        del sentencas[-1]
    return sentencas

def separa_frases(sentenca):
    return re.split(r'[,:;]+', sentenca)

def separa_palavras(frase):
    return frase.split()

def n_palavras_unicas(lista_palavras):
    freq = dict()
    unicas = 0
    for palavra in lista_palavras:
        p = palavra.lower()
        if p not in freq:
            freq[p] = 1
        else:
            if freq[p] == 1:
                unicas -= 1
            freq[p] += 1
    return unicas

def n_palavras_diferentes(lista_palavras):
    freq = dict()
    for palavra in lista_palavras:
        p = palavra.lower()
        if p not in freq:
            freq[p] = True
    return len(freq)

def compara_assinatura(as_a, as_b):
    similaridade = 0
    for i in range(6):
        similaridade += abs(as_a[i] - as_b[i])
    return similaridade / 6

def calcula_assinatura(texto):
    sentencas = separa_sentencas(texto)
    num_sentencas = len(sentencas)
    frases = []
    num_frases = 0
    num_caracteres = 0
    for sentenca in sentencas:
        lista_frases = separa_frases(sentenca)
        num_frases += len(lista_frases)
        for frase in lista_frases:
            frases.append(frase)
            num_caracteres += len(frase)
    lista_palavras = []
    num_palavras = 0
    for frase in frases:
        lista_palavras.extend(separa_palavras(frase))
        num_palavras += len(separa_palavras(frase))
    tam_medio_palavra = num_caracteres / num_palavras
    type_token = n_palavras_diferentes(lista_palavras) / num_palavras
    hapax_legomana = n_palavras_unicas(lista_palavras) / num_palavras
    tam_medio_sentenca = num_caracteres / num_sentencas
    complexidade_sentenca = num_frases / num_sentencas
    tam_medio_frase = num_caracteres / num_frases
    
    return [tam_medio_palavra, type_token, hapax_legomana, tam_medio_sentenca, complexidade_sentenca, tam_medio_frase]

def avalia_textos(textos, ass_cp):
    similaridades = []
    for texto in textos:
        assinatura = calcula_assinatura(texto)
        similaridade = compara_assinatura(assinatura, ass_cp)
        similaridades.append(similaridade)
    
    indice_plagio = similaridades.index(min(similaridades))
    return indice_plagio

# Exemplo de uso:

# Leitura da assinatura da COH-PIAH
ass_cp = le_assinatura()

# Leitura dos textos a serem avaliados
textos = le_textos()

# Avaliação dos textos
indice_plagio = avalia_textos(textos, ass_cp)

print("O autor do texto", indice_plagio+1, "está infectado com COH-PIAH")


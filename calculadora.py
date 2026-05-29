def menu():
    print("=== CALCULADORA FINANCEIRA ===")
    print("1) Porcentagem")
    print("2) Juros Simples")
    print("3) Juros Compostos")
    print("4) Desconto")
    print("5) Regra de Três")
    print("0) Sair")

def ler_numero(mensagem):
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("⚠️ Erro! Por favor, digite apenas números válidos.")

def calcular_porcentagem():
    print("\n── PORCENTAGEM ──")
    print("1) Calcular % de um valor  (ex: quanto é 15% de 200?)")
    print("2) Quanto % um valor representa  (ex: 30 é quanto % de 200?)")
    print("3) Calcular valor com aumento/desconto  (ex: 200 + 15%)")

    tipo = input("\nEscolha: ")

    if tipo == "1":
        valor = ler_numero("Valor total: ")
        taxa = ler_numero("Taxa (%): ")
        resultado = (valor * taxa) / 100
        print(f"\n✅ {taxa}% de {valor} = {resultado:.2f}")
        print(f"📘 Fórmula: resultado = (valor × taxa) ÷ 100")

    elif tipo == "2":
        parte = ler_numero("Valor parcial: ")
        total = ler_numero("Valor total: ")
        resultado = (parte / total) * 100
        print(f"\n✅ {parte} representa {resultado:.2f}% de {total}")
        print(f"📘 Fórmula: % = (parte ÷ total) × 100")

    elif tipo == "3":
        valor = ler_numero("Valor original: ")
        taxa  = ler_numero("Taxa de aumento (+) ou desconto (-): ")
        resultado = valor + (valor * taxa / 100)
        print(f"\n✅ Resultado: {resultado:.2f}")
        print(f"📘 Fórmula: resultado = valor + (valor × taxa ÷ 100)")

    else:
        print("Opção inválida!")

def calcular_juros_simples():
    print("\n── JUROS SIMPLES ──")
    c = ler_numero("Capital Inicial (R$): ")
    i = ler_numero("Taxa de Juros (% ao período): ")
    t = ler_numero("Tempo (períodos): ")

    juros = c * (i / 100) * t
    total = c + juros

    print(f"\n✅ Juros: R$ {juros:.2f}")
    print(f"✅ Total a pagar: R$ {total:.2f}")
    print(f"📘 Fórmula: J = C × i × t")
    print(f"📘 Sendo: C={c} | i={i/100} | t={t}")

def calcular_juros_compostos():
    print("\n── JUROS COMPOSTOS ──")
    c = ler_numero("Capital Inicial (R$): ")
    i = ler_numero("Taxa de Juros (% ao período): ")
    t = ler_numero("Tempo (períodos): ")

    total = c * (1 + i / 100) ** t
    juros = total - c

    print(f"\n✅ Juros: R$ {juros:.2f}")
    print(f"✅ Total a pagar: R$ {total:.2f}")
    print(f"📘 Fórmula: M = C × (1 + i)^t")
    print(f"📘 Sendo: C={c} | i={i/100} | t={t}")

def calcular_desconto():
    print("\n── DESCONTO ──")
    print("1) Desconto Comercial  (% sobre valor original)")
    print("2) Desconto Racional   (% sobre valor final)")

    tipo = input("\nEscolha: ")

    if tipo == "1":
        valor = ler_numero("Valor original (R$): ")
        taxa = ler_numero("Porcentagem de desconto (%): ")
        desconto = valor * (taxa / 100)                    
        final = valor - desconto                           
        print(f"\n✅ Desconto: R$ {desconto:.2f}")
        print(f"✅ Valor final: R$ {final:.2f}")
        print(f"📘 Fórmula: D = V × i  |  Final = V - D")

    elif tipo == "2":
        valor = ler_numero("Valor original (R$): ")
        taxa = ler_numero("Taxa de desconto (%): ")
        final = valor / (1 + taxa / 100)
        desconto = valor - final
        print(f"\n✅ Desconto: R$ {desconto:.2f}")
        print(f"✅ Valor final: R$ {final:.2f}")
        print(f"📘 Fórmula: Final = V ÷ (1 + i)")

    else:
        print("Opção inválida!")

def calcular_regra_de_tres():
    print("\n── REGRA DE TRÊS ──")
    print("1) Simples")
    print("2) Composta")

    tipo = input("\nEscolha: ")

    if tipo == "1":
        print("\nSe A está para B, então C está para X")
        a = ler_numero("Valor A: ")
        b = ler_numero("Valor B: ")
        c = ler_numero("Valor C: ")
        x = (b * c) / a
        print(f"\n✅ Valor X = {x:.2f}")
        print(f"📘 Fórmula: X = (B × C) ÷ A")

    elif tipo == "2":
        print("\nDuas grandezas afetando um resultado")
        print("Ex: 5 máquinas produzem 100 peças em 2 dias")
        print("    8 máquinas produzem X peças em 3 dias?\n")
        print("\nSe A1 máquinas produzem em B1 dias → resultado conhecido")
        print("Quantas peças produzem A2 máquinas em B2 dias?\n")
        a1 = ler_numero("Grandeza 1 — valor A (ex: 5 máquinas): ")
        b1 = ler_numero("Grandeza 2 — valor A (ex: 2 dias): ")
        a2 = ler_numero("Grandeza 1 — valor B (ex: 8 máquinas): ")
        b2 = ler_numero("Grandeza 2 — valor B (ex: 3 dias): ")
        resultado = ler_numero("Resultado conhecido (ex: 100 peças): ")  # ✅ usa ler_numero
        x = (a2 * b2 * resultado) / (a1 * b1)
        print(f"\n✅ Resultado X = {x:.2f}")
        print(f"📘 Fórmula: X = (A2 × B2 × resultado) ÷ (A1 × B1)")

    else:
        print("Opção inválida!")

if __name__ == "__main__":
    while True:
        menu()
        opcao = input("\nEscolha uma opção: ")

        if opcao == "0":
            print("Até logo!")
            break
        elif opcao == "1":
            calcular_porcentagem()
        elif opcao == "2":
            calcular_juros_simples()
        elif opcao == "3":
            calcular_juros_compostos()
        elif opcao == "4":
            calcular_desconto()
        elif opcao == "5":
            calcular_regra_de_tres()
        else:
            print("⚠️ Opção inválida! Escolha entre 0 e 5.")
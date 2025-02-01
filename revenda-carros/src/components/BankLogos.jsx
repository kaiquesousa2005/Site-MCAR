import styles from "./BankLogos.module.css"
import santander from "./imagens/santander.png"
import bv from "./imagens/bv.png"
import pan from "./imagens/pan.png"
import bradesco from "./imagens/bradesco.png"
import itau from "./imagens/itau.png"
import daycoval from "./imagens/daycoval.png"

const BankLogos = () => {
  const banks = [
    { name: "BV", logo: bv },
    { name: "Itau", logo: itau },
    { name: "Bradesco", logo: bradesco },
    { name: "Pan", logo: pan },
    { name: "Daycoval", logo: daycoval },
    { name: "Santander", logo: santander },
  ]

  return (
    <div className={styles.bankLogosContainer}>
      <h3>Bancos Parceiros</h3>
      <div className={styles.logoGrid}>
        {banks.map((bank) => (
          <div key={bank.name} className={styles.logoItem}>
            <img src={bank.logo || "/placeholder.svg"} alt={`${bank.name} logo`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BankLogos


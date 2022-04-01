import styles from '../styles/spinner.module.css'
const Loader = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  )
}

export default Loader

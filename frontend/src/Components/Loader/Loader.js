import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.ldsDefault}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;
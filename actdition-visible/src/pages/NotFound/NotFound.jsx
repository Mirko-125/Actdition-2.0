import Navbar from '../../components/functionalities/navbar/Navbar';
import styles from './NotFound.module.css';

function NotFound() {

    return (
      <>
        <Navbar/>
        <div className={styles.pricedown}>
            404<span>this isn't the page you were looking for</span>
        </div>
      </>
    )
  }
  
  export default NotFound
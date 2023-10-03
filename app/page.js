import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/Footer';
import dynamic from 'next/dynamic';

const TransactionData = dynamic(() => import('./components/TransactionData'), {
  ssr: false
});


export default function Home() {
  return (
    <>
    <div className='bg-footer-bg bg-blend-difference'>
      <Header />
      <Search />
      <TransactionData />
      <Footer/>
      </div>
    </>
  );
}

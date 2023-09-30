import Header from './components/Header';
import Search from './components/Search';
import Data from './components/TransactionData';
import Blocks from './components/Blocks';
import Transactions from './components/Transactions';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Search />
      <Data />
      {/* <Blocks />
      <Transactions />
      <Footer /> */}
    </>
  );
}

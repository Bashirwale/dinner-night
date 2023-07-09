import spinner from '../components/assets/spinner.gif'

const Spinner = () => {
  return (
    <div className="">
      <img
      src={spinner}
      alt="Loading..."
      className='w-8 m-auto block'
    />
    </div>
  );
}

export default Spinner; 
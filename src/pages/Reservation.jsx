const Reservation = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Book Reservation Now <span>!!!</span></h1>
      <form action="#" className="bg-orange-200 p-4 rounded-md">
        <div className="bg-white p-2 rounded-md">
          <label htmlFor="city" className="mr-4 mb-1 font-bold text-orange-500">City:</label>
          <select className="text-lg font-bold focus:outline-orange-500 text-orange-500 rounded-sm">
            <option className="text-orange-300 ">Abuja</option>
            <option className="text-orange-300 ">Lagos</option>
            <option className="text-orange-300 ">Ibadan</option>
            <option className="text-orange-300 ">Ilorin</option>
          </select>
        </div>
        <div className="bg-white p-2 rounded-md mt-4">
          <label htmlFor="Restaurant" className="mr-4 mb-1 font-bold text-orange-500">Restaurant:</label>
          <select className="text-lg font-bold focus:outline-orange-500 text-orange-500 rounded-sm">
            <option className="text-orange-300 ">Kfc</option>
            <option className="text-orange-300 ">Chicken Republic</option>
            <option className="text-orange-300 ">Drumstix</option>
            <option className="text-orange-300 ">Item7</option>
          </select>
        </div>
        <div className="bg-white p-2 rounded-md mt-4">
          <label htmlFor="date" className="mr-4 mb-1 font-bold text-orange-500">Date:</label>
          <input type="date" className="text-lg font-bold focus:outline-orange-500 text-orange-500 rounded-sm" />
        </div>
      </form>
    </div>
  )
}

export default Reservation

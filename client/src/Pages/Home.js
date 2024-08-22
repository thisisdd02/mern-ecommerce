import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from '../Components/BannerProduct'
import HorizontelCardProduct from '../Components/HorizontelCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontelCardProduct category={"airpods"} heading={"Top's Airpods"}/>
      <HorizontelCardProduct category={"watches"} heading={"Popular in Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Trending Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse collection"}/>
      <VerticalCardProduct category={"television"} heading={"Television"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}
 
export default Home 
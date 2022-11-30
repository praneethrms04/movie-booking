import {Routes, Route} from 'react-router-dom'
import Authentication from '../pages/authentication/Authentication'
const AppRoutes =()=>{
    return(
        <>
            <Routes>
                <Route path="/login" element={<Authentication />} />
            </Routes>
        </>
    )
}
export default AppRoutes
// https://relevel-movie-booking-app-be.herokuapp.com/ 
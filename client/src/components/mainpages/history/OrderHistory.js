import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/Payment', {
                        headers: {Authorization: token}
                        
                    })
                 
                    
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])
const sampleFunction=async()=>{
const sample=await axios.get('/api/payment',{
    headers:{Authorization:token}
})
console.log(sample.data.cart.images.url)
}

    return (
        <div className="hstory-page">
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>
<button onClick={sampleFunction}>click me</button>
            <table  style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th>email</th>
                        <th>Phone number</th>
                        <th>Date of Purchased</th>
                       
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.email}</td>
                                <td>{items.number}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory




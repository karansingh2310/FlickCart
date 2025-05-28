import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/cart/order/list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };

  const statusHandler = async (e, orderId)=>{
      try {
        const response = axios.post(backendUrl+'/api/cart/order/status',{orderId, status:e.target.value},{headers: {
            Authorization: `Bearer ${token}`,
          }})
          if((await response).data.success){
            await fetchAllOrders()
          }
      } catch (error) {
        console.log(error)
        toast.error(response.data.message)
      }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6">My Orders</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div  key={order._id} className="border rounded-lg p-4 shadow-sm">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">
                  delivery_truck_speed
                </span>
                <span className="font-semibold">
                  Order #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="font-semibold">₹{order.amount}</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-4 p-3 bg-gray-50 rounded">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image?.[0] || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>Quantity: {item.quantity}</span>
                      {item.size && <span> • Size: {item.size}</span>}
                    </div>
                    <p className="font-semibold mt-1">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="mt-4 pt-3 border-t">
              <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
              <p className="text-sm text-gray-600">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="text-sm text-gray-600">
                Payment Status: {order.payment ? 'Paid':'Pending'}
              </p>
            </div>

            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 font-medium cursor-pointer hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200  bg-no-repeat bg-[length:20px] bg-[right_10px_center]">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

        ))}

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
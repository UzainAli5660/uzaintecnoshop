import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth';
import { db } from '../utils/firebase'; // Adjust the path to your Firebase config
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


function AdUsers() {
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '!=', 'admin@tecnoshop.com') // Exclude the admin email
      );
      const usersSnapshot = await getDocs(usersQuery);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include document id
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const deleteUserAndOrders = async (userId, userEmail, userUid) => {
    try {
      // Delete user from the 'users' collection
      await deleteDoc(doc(db, 'users', userId));

      // Query to delete all orders associated with the user
      const ordersQuery = query(
        collection(db, 'orders'),
        where('email', '==', userEmail)
      );
      const ordersSnapshot = await getDocs(ordersQuery);

      // Delete each order
      const deleteOrders = ordersSnapshot.docs.map((order) => deleteDoc(order.ref));
      await Promise.all(deleteOrders);

      // Remove the user from Firebase Auth (handled by Firebase Admin SDK on the server-side in a production environment)
      const userToDelete = auth.currentUser;
      if (userToDelete && userToDelete.uid === userUid) {
        await deleteUser(userToDelete);
      }

      // Remove the user from the state after deletion
      setUsers(users.filter(user => user.id !== userId));

      console.log(`User ${userEmail} and their orders have been deleted.`);
    } catch (error) {
      console.error('Error deleting user and orders:', error);
    }
  };

  return (
    <div className="ad-users p-8 bg-black">



    <div className="flex items-center justify-center  mb-4">
      <Link to="/admin" className="mr-2">
        <ArrowLeftOutlined style={{ fontSize: "24px", color: "white" }} />
      </Link>
      <h2 className="text-2xl font-bold font-serif text-teal-400 text-center underline">
        Manage Users
      </h2>
    </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-black text-teal-400 shadow-md rounded-lg">
          <thead>
            <tr className="bg-teal-400 text-black">
              <th className="py-2 px-4 font-serif">User ID</th>
              <th className="py-2 px-4 font-serif">Email</th>
              <th className="py-2 px-4 font-serif">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border border-teal-400 text-center">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4  text-white font-serif">{user.email}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => deleteUserAndOrders(user.id, user.email, user.uid)}
                      className="ml-auto  text-teal-300 bg-black border-teal-300 hover:bg-teal-600 border-2 py-2 px-4 focus:outline-none rounded-lg transition-all font-serif font-semibold duration-300"                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdUsers;

import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./products/productSlice";

function App() {
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store.product);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetching the products data from the api
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://dummyjson.com/products");
      let data = await response.json();
      dispatch(setData(data.products));
    }

    fetchData();
  }, [dispatch]);

  // ADD handler
  const handleAddProduct = () => {
    const product = {
      id: storeData[storeData.length - 1].id + 1,
      title: newProduct.title,
      price: newProduct.price,
      stock: newProduct.stock,
    };
    dispatch(addProduct(product));
    setNewProduct({ title: "", price: "", stock: "" });
  };

  // DELETE handler
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  // UPDATE handler
  const handleUpdateProduct = (id) => {
    const updatedProduct = storeData.find((product) => product.id === id);
    if (updatedProduct) {
      const updatedData = {
        ...updatedProduct,
        stock: updatedProduct.stock + 10,
        price: updatedProduct.price + 100,
      };
      dispatch(updateProduct(updatedData));
    }
  };

  return (
    <div className="App p-6 bg-gray-100">
      <h2 className="text-xl mb-4 text-bold h5">Product List</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newProduct.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="p-2 border mb-2 w-full mx-2"
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="p-2 border mb-2 w-full mx-2"
        />
        <input
          type="text"
          value={newProduct.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="p-2 border mb-2 w-full mx-2"
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Product
        </button>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Id</th>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Stock</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map((data) => (
            <tr key={data.id}>
              <td className="px-6 py-3 border-t">{data.id}</td>
              <td className="px-6 py-3 border-t">{data.title}</td>
              <td className="px-6 py-3 border-t">{data.price}</td>
              <td className="px-6 py-3 border-t">{data.stock}</td>
              <td className="px-6 py-3 border-t">
                <button
                  onClick={() => handleUpdateProduct(data.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProduct(data.id)}
                  className="px-4 ml-2 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

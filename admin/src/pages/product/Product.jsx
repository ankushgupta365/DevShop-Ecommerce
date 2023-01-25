import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from "react";
import { userRequest } from '../../requestMethods'
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProducts } from "../../redux/apiCalls";
import { app } from '../../firebase'
import { Redirect } from "react-router-dom";
export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2]
    let product = useSelector(state => state.product.products.find(item => item._id === productId))
    const [pStats, setPStats] = useState([]);

    const [inputs, setInputs] = useState({})
    const [cat, setCat] = useState([])
    const [file, setFile] = useState(null)

    const dispatch = useDispatch()

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        if(file){
        const filename = new Date().getTime() + file.name
        const storage = getStorage(app)
        const strorageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(strorageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const newProduct = { ...inputs, img: downloadURL, categories: cat, _id: productId };
                    updateProducts(productId, newProduct, dispatch);
                    
                })
            }
        );
        }else{
            if(cat.length>0){
            const newProduct = {...inputs, categories: cat, _id: productId}
            updateProducts(productId,newProduct,dispatch)}
            else{
                const newProduct = {...inputs,_id: productId}
            updateProducts(productId,newProduct,dispatch)
            }
        }
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.img} alt="" className="productInfoImg" />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product?.inStock ? "yes" : "no"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" name="title" placeholder={product?.title} onChange={(e) => handleChange(e)} />
                        <label>Product Description</label>
                        <input type="text" name="desc" placeholder={product?.desc} onChange={(e) => handleChange(e)} />
                        <label>Price</label>
                        <input type="number" name="price" placeholder={product?.price} onChange={(e) => handleChange(e)} />
                        <label>Categories</label>
                        <input type="text" name="categories" placeholder={product?.categories} onChange={(e) => handleCat(e)} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={(e) => handleChange(e)}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product?.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react"
import { useMutation ,useLazyQuery } from "react-apollo"
import  UPDATE_CART  from "../graphql/updateCart.graphql"
import GET_PRODUCT from "../graphql/getProductBySku.graphql"
//styles 
import styles from "./styles.css"



const QuickOrder = () => {
    const [inputText, setInputText] = useState("")
    const [search, setSearch] = useState("")
    
    const [ getProductData, { data: product } ] = useLazyQuery(GET_PRODUCT)
    const [ addToCart ] = useMutation(UPDATE_CART)

 

    //onchange
    const handleChange = (e:any) => {
        setInputText(e.target.value)
        console.log("input changed", inputText)
    }

    useEffect(() => {
        console.log("El resultado de mi producto es", product, search)
        if(product) {
            let skuId = parseInt(inputText)
            console.log("Mis datos necesarios:", skuId, product)
            addToCart({
                variables: {
                    salesChannel: "1",
                    items: [
                        {
                            id: skuId,
                            quantity: 1,
                            seller: "1"
                        }
                    ]
                }
            }) 
            .then(()=> {
                window.location.href = "/checkout"
            })
        }
    },[product, search])

    const addProductToCart = () => {
       getProductData({
        variables: {
            sku: inputText
        }
       })
    }

    //submit
    const searchProduct = (e:any) => {
        e.preventDefault();
        if(!inputText){
            alert("escribe algo! :D")
        } else {
            console.log("Al final estamos buscando", inputText)
            setSearch(inputText)
            addProductToCart()
            //setearemos la busqueda
            //buscaremos la data del producto
        }
    }

    return (
        <div className={styles.container__quickorder}>
            <h2 className="f2" >Compra rápida en Vans</h2>
            <div className={styles.container__form}>
                <form onSubmit={searchProduct} className="flex">
                    <div className="ph3">
                        <label className="ph3" htmlFor="sku" >INGRESE SKU</label>
                        <input className={styles.input__cart} id="sku" type="text" onChange={handleChange} />
                    </div>
                    <div className={styles.form__submit}>
                        <input className={styles.btn__cart} type="submit" value="COMPRAR" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default QuickOrder
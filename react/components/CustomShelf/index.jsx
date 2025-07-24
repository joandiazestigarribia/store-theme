import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SliderLayout } from "vtex.slider-layout";

import styles from "./styles.css";

const CustomShelf = ({
    sliderLayoutProps,
    productCluster,
}) => {
    const [productData, setProductData] = useState([]);

    const req = async () => {
        const res = await fetch(
            `/api/catalog_system/pub/products/search?fq=productClusterIds:${productCluster}`,
            {
                method: "GET",
                headers: { Accept: "application/json" },
            }
        );

        return res.json();
    };

    useEffect(() => {
        req().then((res) => {
            setProductData(res);
        });
    }, [productCluster]);

    if (productData && productData.length > 0) {
        return (
            <div className={styles.CarouselContainer}>
                <SliderLayout {...sliderLayoutProps}>
                    {productData.map((product) => {
                        const name = product && product.productName;
                        const img = product && product.items && product.items[0] && product.items[0].images && product.items[0].images[0];
                        const price = product && product.items && product.items[0] && product.items[0].sellers && product.items[0].sellers[0] && product.items[0].sellers[0].commertialOffer && product.items[0].sellers[0].commertialOffer.Price;

                        return (
                            <a
                                href={product && product.link}
                                className={styles.ProductContainer}
                                key={product && product.productId}
                            >
                                <div className={styles.ImageContainer}>
                                    <img
                                        src={img && img.imageUrl}
                                        alt={img && img.imageText}
                                    />
                                </div>

                                <div className={styles.ProductInfo}>
                                    <span className={styles.ProductName}>
                                        {name}
                                    </span>

                                    <span className={styles.ProductPrice}>
                                        ${" "}
                                        {price && price.toFixed(2).toString().replace(".", ",")}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </SliderLayout>
            </div>
        );
    }

    return <></>;
};

export default CustomShelf;

CustomShelf.schema = {
    title: "Carrusel vitrinas custom",
};

CustomShelf.propTypes = {
    productCluster: PropTypes.any,
    sliderLayoutProps: PropTypes.any,
};

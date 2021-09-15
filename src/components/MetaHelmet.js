import React from "react";
import {Helmet} from "react-helmet";

const MetaHelmet = ({ data }) => {
    const title = data.title;
    const description = data.description;
    const image = data.image !== undefined && `${data.image}`;
    const canonical = `https://muggl.cc${data.canonical}`;
    const type = data.type === undefined ? 'website' : data.type;
    const width = data.image && (data.width || 1200);
    const height = data.image && (data.height || 630);

    return (
        <Helmet titleTemplate="%s">
            <html lang="en" />
            <title>{title}</title>
            <meta name="description" content={description} />
            {canonical ? <link rel="canonical" href={canonical} /> : null}
            {image ? <link rel="image_src" href={image} /> : null}
            {image ? <meta itemprop="image" content={image} /> : null}

            <meta property="og:site_name" content="https://about.muggl.cc" />
            <meta property="og:title" content={title} />
            {description ? (
                <meta property="og:description" content={description} />
            ) : null}
            {canonical ? <meta property="og:url" content={canonical} /> : null}
            <meta property="og:type" content={type} />
            {image ? <meta property="og:image" content={image} /> : null}
            {width ? <meta property="og:image:width" content={width} /> : null}
            {height ? <meta property="og:image:height" content={height} /> : null}
            <meta property="fb:pages" content="https://about.muggl.cc" />

        </Helmet>
    );
};

export default MetaHelmet;
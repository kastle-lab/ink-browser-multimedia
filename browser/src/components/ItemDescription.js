import React from 'react'
import Tooltip from '@mui/material/Tooltip';

const WIKI_LOGO = "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png";
const YT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png";

function ItemDescription({ itemName, itemDescription, itemDescriptionReferences = [] }) {
  const refs = itemDescriptionReferences || [];
  const firstRef = refs[0];
  const secondRef = refs[1];
 const capitalizedTitleName = (itemName || '').charAt(0).toUpperCase() + (itemName || '').slice(1);

  const getType = (url = "") => {
    const u = url.toLowerCase();
    if (u.includes("wikipedia.org")) return "wikipedia";
    if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
    if (u.includes("google.com/search")) return "search";
    return "link";
  };

  const renderCard = (url, idx) => {
    if (!url) return null;
    const type = getType(url);
    const logo = type === "wikipedia" ? WIKI_LOGO : type === "youtube" ? YT_LOGO : null;
    const label =
      type === "wikipedia"
        ? `${capitalizedTitleName || "| Wikipedia"}`
        : type === "youtube"
        ? `${capitalizedTitleName || "| Youtube"}`
        : url;

    return (
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "inherit",
          width: 160,
          padding: 8,
          borderRadius: 6,
        }}
      >
        {logo ? (
          <img
            src={logo}
            alt={type}
            style={{ width: 48, height: 48, objectFit: "contain", display: "block" }}
          />
        ) : (
          <div style={{ width: 48, height: 48 }} />
        )}
        <span
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#1a0dab",
            textDecoration: "underline",
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {label}
        </span>
      </a>
    );
  };

  return (
    <>
      <div className="search-top">
        <h2 className="left-search">{itemName ? capitalizedTitleName : <Tooltip title="Detailed of the Topics extracted from the frames available under open-kg-curriculum" arrow>Item Description</Tooltip>}</h2>
      </div>

      <div className="description-bottom">
        <p>{itemDescription ? itemDescription : "No description available."}</p>
        {itemDescription  &&
        <div className="references mt-4" style={{ marginTop: 12 }}>
          <h3 style={{ fontWeight: "bold", marginTop: 10 }}>Related Resources</h3>

          {!firstRef && !secondRef ? (
            <p style={{ fontStyle: "italic", color: "#666" }}>No related resources found.</p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {renderCard(firstRef, 0)}
              {renderCard(secondRef, 1)}
            </div>
          )}
        </div>}
      </div>
    </>
  );
}

export default ItemDescription;

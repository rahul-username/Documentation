# ELTE Salsify Audit
**Date:** Feb 27, 2026 | **Org:** ELTE (s-4d0b7f1f-b675-4e50-85cc-26c845439947)

---

## Executive Summary

The **"custom script"** the ELTE team is referring to is not a traditional script or formula — it's a **STORIS-to-Salsify automated data feed**. It's an SFTP import that runs automatically and pulls product data from ELTE's STORIS POS/ERP system into Salsify.

**How data flows:**
> STORIS POS/ERP → ExaVault SFTP → Salsify (this import) → Shopify (daily publish)

**The core issue:** The feed sends **65+ data columns** from STORIS, but only **~23 are actually mapped** into Salsify. The other **40+ columns** — including dimensions, UPC codes, product brand, keywords, and kit data — are being **completely ignored**. This is likely a big part of what the data cleanup needs to address.

| | |
|---|---|
| **Feed File** | `ELTE-STORIS_FEED_VERSION_B.csv` |
| **Source** | `sftp://salsify.exavault.com` |
| **Last Ran** | Feb 27, 2026 at 3:34 PM |
| **Total Imports Run** | 4,651 |
| **Products in Salsify** | 35,542 |
| **Mapped / Total Columns** | ~23 / 65+ (40+ unmapped) |

**[Open the STORIS Import in Salsify](https://app.salsify.com/app/orgs/s-4d0b7f1f-b675-4e50-85cc-26c845439947/imports/1358265)**

---

## STORIS Import Detail

![[screenshots/01-imports-overview.png]]
*Imports page — STORIS FTP feed is the primary import (4,651 runs)*

### Mapped Fields (23 columns actually imported)

| STORIS Column | Salsify Property | Type |
|---|---|---|
| ProdNo | SKU | String |
| MSRP | MSRP | String |
| NormalPrice | NormalPrice | String |
| ProductPrice | ProductPrice | String |
| ObsoleteStatusCode | ObsoleteStatusCode | Picklist |
| TaxClass | TaxClass | String |
| LeadDays | LeadDays | String |
| NoAvailByLoc | NoAvailByLoc | String |
| ProductBenefits | Storis Product Benefits | String |
| VendorModelNbr | Vendor Model# (or Name) | String |
| NextAvailPODate | Date of Next Available PO | Date |
| WebBenifits | Storis Data Unparsed Web Benefits | String |
| Size | Storis Size | String |
| FlashGroupName | Storis Family | String |
| CategoryDescription | Category Description | String |
| GroupDescription | Storis Group | String |
| VendorID | Vendor Code | String |
| VendorName | VendorName | String |
| ProductDescription | 1st Description | String |
| SecondDescription | 2nd Description | String |
| FirstReceiptDate | First Receipt Date | Date |
| FloorModel | Floor Model Quantity | Number |
| Color | Storis Colour | String |

![[screenshots/03-storis-import-summary-top.png]]
*Field mapping configuration (top half)*

![[screenshots/04-storis-import-summary-bottom.png]]
*Field mapping configuration (bottom half)*

### Unmapped Fields (40+ columns being ignored)

> These columns are in the STORIS CSV feed but **not mapped** to any Salsify property — all this data is thrown away on every import.

`Addon` `AsAdvertised` `AsIsReason` `AvailOnWeb` `ColorPalette` `DimenDepth` `DimenHeight` `DimenWidth` `Keywords` `KitAvail` `KitComments` `KitDepth` `KitDesc` `KitHeight` `KitId` `KitPrice` `KitPriceSource` `KitQty` `KitSuggPrice` `KitWidth` `MadeDescription` `ObsoleteStatus` `ProductBrand` `ProductBrandDesc` `ProductCategory` `ProductCollection` `ProductCollectionDesc` `ProductDesc` `ProductGroup` `ProductVendor` `ShowAvailability` `SuppressAddToCart` `WebEnable` `WebCatVal` `CompanySpecial` `RelatedItems` `TaxonomyCategoryCode` `TaxonomyCategoryDescription` `TaxonomyValueCode` `TaxonomyValueDescription` `VendorUPCCode` `AlternateVendorUPCCode` `MaximumTradeDiscount` `Fabric` `AsIsLocations` `LocationList`

![[screenshots/02-storis-import-mappings-data.png]]
*STORIS import data grid — product rows being pulled in*

---

## Channels (30 total)

Where the data goes after Salsify. [Open Channels in Salsify](https://app.salsify.com/app/orgs/s-4d0b7f1f-b675-4e50-85cc-26c845439947/channels)

![[screenshots/00-channels-list-page1.png]]
*Channels list — active Shopify, Dropbox, and FTP channels*

### Active Shopify Channels

| Channel | Last Published | Status |
|---|---|---|
| D2C Shopify (elte-development) | 2 hours ago — 139 products, daily | Active |
| D2C Shopify (mkt-development) | 3 hours ago | Active |
| Data only (No images) D2C Shopify (elte-development) | 2 hours ago | Active |
| Data only (No Images) D2C Shopify (mkt-development) | 3 hours ago | Active |
| D2C Shopify (eltedevtrue) | 1 year ago | Stale |
| Data Mkt Clean | 6 months ago | Stale |

![[screenshots/05-d2c-shopify-elte-channel.png]]
*D2C Shopify (elte-development) — the main channel, publishes daily*

### Other Active Channels

| Channel | Type | Last Published |
|---|---|---|
| D,T with a PO message | Dropbox | 1 hour ago |
| Inventory Quantity Export — ELTE | FTP | 3 hours ago |
| Inventory Quantity Export — MKT | FTP | 3 hours ago |
| Maureen DBAs with no PO | Dropbox | 1 hour ago |
| Overdue POs | CSV Export | 11 hours ago |
| Process New SKUs | CSV Export | 15 days ago |
| Rich Content for Marketing Team | Dropbox | 1 day ago |

### 9 "(Unsupported)" Legacy Channels — Needs Cleanup

These are deprecated channel types that Salsify no longer supports. Several haven't published in months or years.

| Channel | Type | Last Published | Status |
|---|---|---|---|
| (Unsupported) Coverage Report | Export .xlsx | 2 years ago | Stale |
| (Unsupported) - Custom Channel | Export .csv | 4 years ago | Stale |
| (Unsupported) Custom Channel - test | Export | Never | Unused |
| (Unsupported) ELTE Sale Furniture Product | Dropbox | 10 months ago | 1,252 publishes |
| (Unsupported) Lead Time is Zero | Export .csv | 10 months ago | Stale |
| (Unsupported) Mkt Sale Furniture | Dropbox | 10 months ago | Failed |
| (Unsupported) More than 16 Weeks with no PO (not rugs) | Dropbox | 10 months ago | Stale |
| (Unsupported) More than 16 Weeks with no PO Rugs | Dropbox | 10 months ago | Stale |
| (Unsupported) Outlet Notice | Export | Never | Unused |

![[screenshots/00c-channels-list-page2.png]]
*Channels page 2 — the (Unsupported) legacy channels*

---

## Properties & Workflows

**238 properties** across 10 groups. No computed or formula properties — all standard types. [View Properties](https://app.salsify.com/app/orgs/s-4d0b7f1f-b675-4e50-85cc-26c845439947/governance/properties)

**Groups:** STORIS Data, Core Data, Product Specs, Marketing Content, Inventory & Delivery Info, Product Settings, Shipping & Return, Website Information, Digital Assets, Unassigned

**Workflows:** No custom workflows deployed. 35 standard Salsify templates in the library. No active tasks. [View Workflows](https://app.salsify.com/app/orgs/s-4d0b7f1f-b675-4e50-85cc-26c845439947/workflow/workflows)

![[screenshots/06-properties-lead-time.png]]
*Properties page — searching "lead time" shows 8 related properties*

---

## Key People

- **Paige Malling** — ran many of the export channels
- **Aaron Tham** — runs the daily Shopify publishes

-- Fill products table
INSERT INTO products (title, description, image, price) VALUES
(
  'Kilchoman Machir Bay Cask Strength',
  'This Christmas limited edition from Kilchoman distillery in Islay has taken their Machir Bay expression and produced it in its purest form at cask strength. There is also a festive twist on the box, featuring sheep in Santa hats! Machir Bay whisky itself is named after the beautiful beach located just two kilometres from the distillery and is matured in a selection of both bourbon and sherry barrels. A dram of this comes at a sturdy 58.6% abv.',
  'https://cdn.whiskyshop.com/pub/media/catalog/product/cache/aef55ef6584d64da4f1d18bf9c37c326/k/i/kilchoman_machirbay_caskstrength_ps.jpg',
  60
),
(
  'Ardbeg 10 Year Old Ardbone Pack',
  'Ardbeg Ten Year Old is considered by some to be the peatiest, smokiest, most complex single malt of them all. It is non chill-filtered and has a strength of 46% ABV, thus retaining maximum flavour, at the same time giving more body and added depth.',
  'https://cdn.shopify.com/s/files/1/1402/9187/products/Ardbeg_10_The_Ultimate_Knochen_GP_ml.jpg?v=1579908095',
  70
),
(
  'Port Charlotte MRC: 01 2010',
  'This expression from Bruichladdich Port Charlotte range is the first UK release in the Cask Exploration Series. Distilled in 2010 from barley peated to 40ppm, this single malt has been matured in a 50/50 split of first-fill American whiskey barrels and second-fill French wine barriques before being married together for one year in high provenance MR casks from the Bordeaux left bank.',
  'https://cdn.whiskyshop.com/pub/media/catalog/product/cache/2abd55d4652b7da9c22e6db705841081/p/o/portcharlotte_mrc01_2010_ps.jpg',
  84
),
(
  'Isle of Jura Superstition',
  'The Jura distillery on the island of Jura was rebuilt in 1963. In Superstition, the owners wanted to produce a wild whisky that iss as rich as the Jura story and a testament to all the intriguing histories around the world, so they added the ancient Ankh cross, a symbol of good luck in the western isles, to the front of the bottle. The finest young and aged (up to 21 years) whiskies go into this mysterious bottle, so there is a different flavour to explore with every drop. This is matured in ex-Bourbon casks and is a lightly peated malt with hints of smoke. Jura’s iconic distillery does not traditionally produce peated whiskies. Superstition, however, comprises 13 per cent of heavily peated malt and this ingredient delivers a lightly peated result. Furthermore, components of the peated element have been aged for up to 21 years, the significance of that being that age will have softened the overall peat impact.',
  'https://img.thewhiskyexchange.com/900/iojob.non.jpg',
  68
),
(
  'Laphroaig Quarter Cask',
  'Laphroaig Quarter Cask offers an delicious doubling of flavour, due to the double maturation in two barrels made of American oak. Still-maturing whisky from their standard ex-bourbon barrels is transferred to quarter casks and left to rest in our warehouse just a short distance away from the Atlantic ocean.The innovative use of the smaller cask size, allows for an increased contact with the oak, creating a rich and smooth edge to complement Laphroaig’s distinctive peatiness.',
  'https://img.thewhiskyexchange.com/900/lrgob.non1.jpg',
  47
),
(
  'Laphroaig 10 Year Old',
  'Produced by Laphroaig distillery on Islay, this single malt has been matured for a full decade in seasoned oak barrels, charred before filling, and bottled at a natural cask strength of 60.1% abv, retaining the full flavour of the make without any dilution.',
  'https://img.thewhiskyexchange.com/900/lrgob.10yov1.jpg',
  40
),
(
  'Lagavulin 16 Year Old',
  'An Islay Malt, this is from one of Scotlands essential distilleries, on a cramped, chaotic, wildly romantic site. Demand heavily exceeds supply. The intense character comes from their own richly peaty water supply; the heavily peated barley; the unusually long fermentation - up to 75 hours; and the slowest distillation of any Islay malt.',
  'https://img.thewhiskyexchange.com/900/lgvob.16yo.jpg',
  52
),
(
  'Talisker 10 Year Old',
  'Deep and stormy like the ocean crashing over the rocky shores of its island distillery, Talisker is the only Single Malt Scotch Whisky rugged enough to call the Isle of Skye its home.',
  'https://img.thewhiskyexchange.com/900/talob.10yo.jpg',
  48
),
(
  'Chivas Regal 12 Year Old',
  'Chivas Regal was founded in Aberdeen in 1801 by two brothers, John and James Chivas. The Chivas Brothers had a luxury store in Aberdeen from where they retailed goods they had imported from across the world. In 1843, Queen Victoria, staying at Balmoral, requested Cognac from their store but due to huge shortages of grapes in France, there was none to be had. The brothers selected from their finest whiskies to blend a whisky that would be good enough for the Queen and Chivas Regal was born.',
  'https://img.thewhiskyexchange.com/900/blend_chi1.jpg',
  32
)

-- Fill stocks table
INSERT INTO stocks (product_id, count) VALUES
('9372db09-64a9-4c6c-9d5e-9771c0c4ea2a', 4),
('dd9276b4-c594-4acd-8bc9-3a4f7cb97132', 6),
('391fcab2-7d92-46d8-865a-15d4a38ea1a2', 7),
('4b9afb91-8e32-46ba-ade9-11782cf2945e', 12),
('f68059aa-e51e-45b0-a6a5-95f976a4d5bf', 7),
('4317ffa1-b6c9-48cf-9385-2e794319874e', 8),
('1cad7ce6-4313-4ab5-b797-f76e69277e1b', 2),
('81686fbc-2ae7-455e-b86b-44c5bc895d44', 3),
('d2e52642-f0d0-4d86-9f89-b8284d18eaa9', 8)

 

(() => {
  "use strict";

  const BUILD = "2026.10.22-pointer-merge-v3";
  const DRAG_THRESHOLD = 8;
  const pathCode = window.BB_PATH === "game-1" ? "game-1" : "game-2";
  const storyMode = window.BB_STORY === true;
  const screen = document.querySelector("#screen");
  const levelStat = document.querySelector("#levelStat");
  const scoreStat = document.querySelector("#scoreStat");
  const storageKey = `burger-borough-${BUILD}-${pathCode}`;

  const FOODS = {
    burger: {
      name: "Burger",
      tiers: [
        { icon: "🥯", name: "Burger starter" },
        { icon: "🍔", name: "Classic burger" },
        { icon: "🍔", name: "Deluxe burger" }
      ]
    },
    fries: {
      name: "Fries",
      tiers: [
        { icon: "🥔", name: "Potato portion" },
        { icon: "🍟", name: "Fries" },
        { icon: "🍟", name: "Seasoned fries" }
      ]
    },
    shake: {
      name: "Milkshake",
      tiers: [
        { icon: "🥛", name: "Shake base" },
        { icon: "🥤", name: "Milkshake" },
        { icon: "🥤", name: "Deluxe shake" }
      ]
    },
    chicken: {
      name: "Spicy chicken",
      tiers: [
        { icon: "🍗", name: "Chicken starter" },
        { icon: "🥪", name: "Spicy-chicken sandwich" },
        { icon: "🌶️", name: "Deluxe spicy chicken" }
      ]
    },
    icecream: {
      name: "Ice cream",
      tiers: [
        { icon: "🥛", name: "Ice-cream base" },
        { icon: "🍦", name: "Ice cream" },
        { icon: "🍨", name: "Recovery sundae" }
      ]
    },
    pizza: {
      name: "Pizza",
      tiers: [
        { icon: "🫓", name: "Pizza dough" },
        { icon: "🍕", name: "Cheese pizza" },
        { icon: "🍕", name: "Borough pizza" }
      ]
    }
  };

  const CUSTOMERS = [
    { name: "Mateo", icon: "🧑🏽" },
    { name: "Nia", icon: "👩🏾" },
    { name: "Avery", icon: "🧑🏻" },
    { name: "Maya", icon: "👩🏻" },
    { name: "Theo", icon: "🧔🏽" },
    { name: "Lena", icon: "👩🏾" },
    { name: "Sam", icon: "🧑🏼" },
    { name: "Imani", icon: "👩🏿" },
    { name: "Luis", icon: "🧑🏽" },
    { name: "Grace", icon: "👩🏼" },
    { name: "Noah", icon: "🧑🏿" },
    { name: "Rina", icon: "👩🏽" },
    { name: "Owen", icon: "🧔🏻" },
    { name: "June", icon: "👵🏽" }
  ];

  const order = (food, tier) => ({ food, tier });
  const LEVELS = [
    {
      number: 1,
      unlock: "burger",
      title: "Open the doors",
      intro: "Pizza Pleasure Palace has opened across the street, and Chef Bea's regular lunch crowd is disappearing. Mateo and Nia promise to help spread the word if you can get Burger Borough serving again.",
      outro: "The first customers return. Bea sees a line forming while the Palace's grand-opening banner begins to sag.",
      orders: [order("burger", 2), order("burger", 2), order("burger", 3), order("burger", 2)]
    },
    {
      number: 2,
      unlock: "fries",
      title: "The missing potato delivery",
      intro: "Burger Borough's potato delivery is redirected to the wrong address. Nia finds the boxes, and Bea adds fries before the lunch rush gets away.",
      outro: "The burger-and-fries orders move quickly. Mateo spots customers carrying Burger Borough bags past the Palace windows.",
      orders: [order("burger", 2), order("fries", 2), order("burger", 3), order("fries", 2), order("burger", 2), order("fries", 3)]
    },
    {
      number: 3,
      unlock: "shake",
      title: "The broken-machine rumor",
      intro: "A rumor claims Bea's milkshake machine is broken. Maya posts a photo of it running, and Bea asks you to prove the rumor wrong one order at a time.",
      outro: "Milkshakes appear all over the neighborhood feed. The false rumor collapses, and Burger Borough unlocks its first fictional study reward.",
      orders: [order("burger", 2), order("fries", 2), order("shake", 2), order("burger", 3), order("fries", 3), order("shake", 2), order("burger", 2), order("shake", 3)]
    },
    {
      number: 4,
      unlock: "chicken",
      title: "Turn up the heat",
      intro: "Pizza Pleasure Palace posts misleading warnings about Bea's new spicy-chicken sandwich. Theo challenges the neighborhood to taste it for themselves.",
      outro: "Customers finish the spicy rush and share their own reactions. Bea's clear menu beats the Palace's scare campaign.",
      orders: [order("burger", 2), order("fries", 2), order("shake", 2), order("chicken", 2), order("burger", 3), order("chicken", 2), order("fries", 3), order("shake", 3), order("chicken", 3), order("burger", 2)]
    },
    {
      number: 5,
      unlock: "icecream",
      title: "A second chance",
      intro: "An overwhelmed customer receives an order that is hotter than expected. Bea replaces it and offers complimentary ice cream, turning the complaint into a chance to rebuild trust.",
      outro: "The recovery sundae caps the restaurant's loss while the customer agrees to return. Burger Borough survives the hardest rush yet.",
      orders: [order("burger", 2), order("fries", 2), order("shake", 2), order("chicken", 2), order("icecream", 2), order("burger", 3), order("fries", 3), order("shake", 3), order("chicken", 3), order("icecream", 3), order("burger", 2), order("icecream", 2)]
    },
    {
      number: 6,
      unlock: "pizza",
      title: "Take back the block",
      intro: "Burger Borough is safe, but Bea wants a final answer to the restaurant across the street. She adds an original pizza menu and invites the entire neighborhood.",
      outro: "The final orders leave the counter. Burger Borough has not copied the Palace—it has become the neighborhood restaurant that can do both.",
      orders: [order("burger", 2), order("fries", 2), order("shake", 2), order("chicken", 2), order("icecream", 2), order("pizza", 2), order("burger", 3), order("fries", 3), order("shake", 3), order("chicken", 3), order("icecream", 3), order("pizza", 3), order("pizza", 2), order("burger", 2)]
    }
  ];

  const defaultState = () => ({
    level: 1,
    completedLevel: 0,
    screen: "intro",
    board: Array(25).fill(null),
    selectedCell: -1,
    orderDone: [],
    energy: 0,
    levelScore: 0,
    totalScore: 0,
    status: "",
    startedAt: Date.now(),
    levelActiveSince: 0,
    levelTimes: Array(6).fill(0),
    levelScores: Array(6).fill(0),
    levelMerges: Array(6).fill(0),
    levelEnergyUsed: Array(6).fill(0),
    restarts: Array(6).fill(0),
    generatorTaps: 0,
    merges: 0,
    ordersServed: 0,
    invalidMoves: 0,
    dragAttempts: 0,
    dragMerges: 0,
    dragMoves: 0,
    dragServes: 0,
    failedDrops: 0,
    rewardChoice: "",
    endedEarly: false,
    exitReason: "",
    resumeScreen: "intro",
    finalized: false
  });

  function loadState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved && saved.pathCode === pathCode && !saved.finalized) {
        return { ...defaultState(), ...saved, pathCode };
      }
    } catch (_error) {}
    return { ...defaultState(), pathCode };
  }

  let state = loadState();
  let pointerDrag = null;
  let highlightedDrop = null;
  let suppressTileClickUntil = 0;
  if (state.screen === "play") state.levelActiveSince = Date.now();

  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_error) {}
  }

  function esc(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function currentLevel() { return LEVELS[state.level - 1] || LEVELS[5]; }
  function unlockedFoods() { return LEVELS.slice(0, state.level).map(level => level.unlock); }
  function requiredBaseItems(level = currentLevel()) { return level.orders.reduce((sum, item) => sum + (2 ** (item.tier - 1)), 0); }
  function energyBudget(level = currentLevel()) { return requiredBaseItems(level) + Math.max(4, Math.ceil(requiredBaseItems(level) * 0.2)); }
  function foodTier(food, tier) { return FOODS[food].tiers[tier - 1]; }
  function completedOrders() { return state.orderDone.filter(Boolean).length; }
  function rewardForLevel(level = state.completedLevel) {
    if (level >= 5) return { id: "combo", name: "Discount toward a burger, fries, and a milkshake or ice cream" };
    if (level >= 4) return { id: "burger-fries", name: "Discount toward a burger and fries" };
    if (level >= 3) return { id: "fries", name: "Discount toward fries" };
    return { id: "none", name: "No food discount unlocked" };
  }

  function updateHeader() {
    levelStat.textContent = Math.min(state.level, 6);
    scoreStat.textContent = state.totalScore.toLocaleString();
  }

  function pauseLevelClock() {
    if (state.screen === "play" && state.levelActiveSince) {
      state.levelTimes[state.level - 1] += Math.max(0, (Date.now() - state.levelActiveSince) / 1000);
      state.levelActiveSince = 0;
    }
  }

  function resumeLevelClock() {
    if (state.screen === "play" && !state.levelActiveSince) state.levelActiveSince = Date.now();
  }

  function formatTime(seconds) {
    const rounded = Math.max(0, Math.round(seconds));
    return `${String(Math.floor(rounded / 60)).padStart(2, "0")}:${String(rounded % 60).padStart(2, "0")}`;
  }

  function exitButton() {
    return `<button class="quiet" data-action="request-exit">I've played enough of Burger Borough to complete the survey</button>`;
  }

  function renderIntro() {
    state.screen = "intro";
    const hero = storyMode
      ? `<div class="hero story-hero"><div class="hero-character">👩🏽‍🍳</div><div><p class="eyebrow light">Chef Bea needs your help</p><h1>Can Burger Borough survive?</h1><p>Pizza Pleasure Palace has opened across the street. Help Bea serve the neighborhood and build Burger Borough's comeback.</p></div></div>`
      : `<div class="hero"><div><p class="eyebrow light">Burger Borough</p><h1>Build, merge, and serve.</h1><p>Combine matching food pieces, complete restaurant orders, and unlock new menu items as the levels become more difficult.</p></div></div>`;
    screen.innerHTML = `${hero}<div class="how-to"><h2>How to play</h2><ol><li>Tap a food generator to place a starter on the board.</li><li>Drag one matching piece onto another to merge them. You can also tap two matching pieces.</li><li>Drag completed food to its matching order, or select it and tap the order.</li></ol></div><div class="possibilities"><strong>Possible fictional rewards</strong><span>Fries discount</span><span>Burger-and-fries discount</span><span>Combo discount</span></div><div class="notice"><strong>Study notice:</strong> All Burger Borough food discounts are fictional, have no cash value, and cannot actually be redeemed. Game progress, actions, and time may be recorded. You may stop and continue to the survey at any time.</div><button class="primary" data-action="begin">Open Burger Borough</button>`;
    save();
    updateHeader();
  }

  function renderBrief() {
    state.screen = "brief";
    const level = currentLevel();
    const food = FOODS[level.unlock];
    const content = storyMode
      ? `<div class="scene-card"><div class="scene-characters"><span>👩🏽‍🍳</span><span>${CUSTOMERS[(level.number - 1) % CUSTOMERS.length].icon}</span></div><p class="eyebrow">Chapter ${level.number}</p><h1>${esc(level.title)}</h1><p>${esc(level.intro)}</p></div>`
      : `<div class="level-card"><p class="eyebrow">Level ${level.number}</p><h1>Complete ${level.orders.length} orders</h1><p>Merge matching food pieces and submit the requested items.</p></div>`;
    screen.innerHTML = `${content}<div class="unlock-card"><span>${food.tiers[1].icon}</span><div><small>Menu item available</small><strong>${esc(food.name)}</strong></div></div><div class="metrics"><div><small>Orders</small><strong>${level.orders.length}</strong></div><div><small>Energy</small><strong>${energyBudget(level)}</strong></div><div><small>Food chains</small><strong>${unlockedFoods().length}</strong></div></div><button class="primary" data-action="start-level">Start Level ${level.number}</button>${exitButton()}`;
    save();
    updateHeader();
  }

  function setupLevel() {
    const level = currentLevel();
    state.board = Array(25).fill(null);
    state.selectedCell = -1;
    state.orderDone = level.orders.map(() => false);
    state.energy = energyBudget(level);
    state.levelScore = 0;
    state.status = "Generate a starter, then drag it onto a matching piece.";
    state.screen = "play";
    state.levelActiveSince = Date.now();
    save();
  }

  function orderCard(item, index) {
    const tier = foodTier(item.food, item.tier);
    const done = state.orderDone[index];
    const customer = CUSTOMERS[(index + (state.level - 1) * 3) % CUSTOMERS.length];
    const identity = storyMode
      ? `<span class="customer-icon">${customer.icon}</span><small>${esc(customer.name)}</small>`
      : `<span class="order-number">${index + 1}</span><small>Order ${index + 1}</small>`;
    return `<button class="order ${done ? "done" : ""}" data-order="${index}" ${done ? "disabled" : ""} aria-label="${done ? "Completed" : "Serve"} ${esc(tier.name)} order">${identity}<span class="order-food">${tier.icon}<b>${item.tier === 3 ? "★" : ""}</b></span><strong>${done ? "Served" : esc(tier.name)}</strong></button>`;
  }

  function boardCell(tile, index) {
    if (!tile) return `<div class="board-cell empty" data-cell="${index}" aria-label="Empty board space"></div>`;
    const tier = foodTier(tile.food, tile.tier);
    return `<button class="board-cell tile ${state.selectedCell === index ? "selected" : ""}" data-cell="${index}" aria-label="${esc(tier.name)}, tier ${tile.tier}. Drag to a matching tile or order; tap to select."><span>${tier.icon}</span><small>${esc(tier.name)}</small><b>${"●".repeat(tile.tier)}</b></button>`;
  }

  function renderPlay() {
    state.screen = "play";
    resumeLevelClock();
    const level = currentLevel();
    const progress = Math.round((completedOrders() / level.orders.length) * 100);
    const characterStrip = storyMode
      ? `<div class="character-strip"><span>👩🏽‍🍳</span><div><strong>Chef Bea</strong><small>Keep the orders moving—Burger Borough is counting on you.</small></div></div>`
      : "";
    const generators = unlockedFoods().map(food => {
      const starter = foodTier(food, 1);
      return `<button class="generator" data-generate="${food}" ${state.energy <= 0 ? "disabled" : ""}><span>${starter.icon}</span><small>Generate</small><strong>${esc(FOODS[food].name)}</strong></button>`;
    }).join("");
    screen.innerHTML = `<p class="eyebrow">Level ${level.number} · ${completedOrders()}/${level.orders.length} orders</p><div class="play-summary"><div><small>Energy</small><strong>⚡ ${state.energy}</strong></div><div><small>Level score</small><strong>★ ${state.levelScore}</strong></div><div><small>Progress</small><strong>${progress}%</strong></div></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>${characterStrip}<section><h2 class="section-title">Orders</h2><div class="orders">${level.orders.map(orderCard).join("")}</div></section><section><h2 class="section-title">Food generators</h2><div class="generators">${generators}</div></section><section><div class="board-heading"><h2 class="section-title">Merge board</h2><span>Drag to merge · tap also works</span></div><div class="board">${state.board.map(boardCell).join("")}</div></section><div class="status">${esc(state.status)}</div><div class="button-row"><button class="secondary" data-action="restart-level">Restart level</button><button class="secondary" data-action="clear-selection">Clear selection</button></div>${exitButton()}`;
    save();
    updateHeader();
  }

  function generate(food) {
    if (!unlockedFoods().includes(food) || state.energy <= 0) return;
    const emptyIndex = state.board.findIndex(cell => !cell);
    if (emptyIndex < 0) {
      state.status = "The board is full. Merge or serve existing pieces before generating more.";
      state.invalidMoves += 1;
      renderPlay();
      return;
    }
    state.board[emptyIndex] = { food, tier: 1 };
    state.energy -= 1;
    state.generatorTaps += 1;
    state.levelEnergyUsed[state.level - 1] += 1;
    state.selectedCell = emptyIndex;
    state.status = `${foodTier(food, 1).name} added. Generate a match or select another tile.`;
    renderPlay();
  }

  function mergeCells(sourceIndex, targetIndex, viaDrag = false) {
    const source = state.board[sourceIndex];
    const target = state.board[targetIndex];
    if (!source || !target || source.food !== target.food || source.tier !== target.tier || target.tier >= 3) return false;
    state.board[targetIndex] = { food: target.food, tier: target.tier + 1 };
    state.board[sourceIndex] = null;
    state.selectedCell = targetIndex;
    state.merges += 1;
    state.levelMerges[state.level - 1] += 1;
    state.levelScore += 10;
    if (viaDrag) state.dragMerges += 1;
    state.status = `${foodTier(target.food, target.tier + 1).name} created${viaDrag ? " by dragging" : ""}.`;
    return true;
  }

  function dropTileOnCell(sourceIndex, targetIndex) {
    const source = state.board[sourceIndex];
    if (!source || targetIndex < 0 || targetIndex >= state.board.length || sourceIndex === targetIndex) {
      state.failedDrops += 1;
      state.invalidMoves += 1;
      state.status = "Drag the piece onto a different board space or a matching order.";
      renderPlay();
      return;
    }
    if (!state.board[targetIndex]) {
      state.board[targetIndex] = source;
      state.board[sourceIndex] = null;
      state.selectedCell = targetIndex;
      state.dragMoves += 1;
      state.status = `${foodTier(source.food, source.tier).name} moved.`;
      renderPlay();
      return;
    }
    if (!mergeCells(sourceIndex, targetIndex, true)) {
      state.selectedCell = sourceIndex;
      state.failedDrops += 1;
      state.invalidMoves += 1;
      state.status = "Those pieces do not match. Drag together two pieces with the same food and tier.";
    }
    renderPlay();
  }

  function selectCell(index) {
    const tile = state.board[index];
    if (!tile) return;
    if (state.selectedCell < 0) {
      state.selectedCell = index;
      state.status = `${foodTier(tile.food, tile.tier).name} selected.`;
      renderPlay();
      return;
    }
    if (state.selectedCell === index) {
      state.selectedCell = -1;
      state.status = "Selection cleared.";
      renderPlay();
      return;
    }
    if (!mergeCells(state.selectedCell, index)) {
      state.selectedCell = index;
      state.status = "Those pieces do not match. The new piece is selected instead.";
      state.invalidMoves += 1;
    }
    renderPlay();
  }

  function serveOrderFromCell(index, cellIndex, viaDrag = false) {
    const level = currentLevel();
    if (state.orderDone[index]) return;
    if (cellIndex < 0 || !state.board[cellIndex]) {
      state.status = "Select a completed food tile before choosing an order.";
      state.invalidMoves += 1;
      if (viaDrag) state.failedDrops += 1;
      renderPlay();
      return;
    }
    const selected = state.board[cellIndex];
    const requested = level.orders[index];
    if (selected.food !== requested.food || selected.tier !== requested.tier) {
      state.status = `That tile does not match ${foodTier(requested.food, requested.tier).name}.`;
      state.invalidMoves += 1;
      if (viaDrag) state.failedDrops += 1;
      renderPlay();
      return;
    }
    state.board[cellIndex] = null;
    state.selectedCell = -1;
    state.orderDone[index] = true;
    state.ordersServed += 1;
    if (viaDrag) state.dragServes += 1;
    state.levelScore += requested.tier === 3 ? 180 : 100;
    state.status = `${foodTier(requested.food, requested.tier).name} served${viaDrag ? " by dragging" : ""}.`;
    if (state.orderDone.every(Boolean)) completeLevel();
    else renderPlay();
  }

  function serveOrder(index) {
    serveOrderFromCell(index, state.selectedCell, false);
  }

  function restartLevel() {
    pauseLevelClock();
    state.restarts[state.level - 1] += 1;
    setupLevel();
    state.status = "Level restarted. Previous actions remain recorded, but the level score has reset.";
    renderPlay();
  }

  function completeLevel() {
    pauseLevelClock();
    const index = state.level - 1;
    const energyBonus = state.energy * 5;
    state.levelScore += energyBonus;
    state.levelScores[index] = state.levelScore;
    state.completedLevel = state.level;
    state.totalScore = state.levelScores.reduce((sum, value) => sum + value, 0);
    state.screen = "complete";
    save();
    postProgress();
    renderComplete();
  }

  function renderComplete() {
    state.screen = "complete";
    const level = currentLevel();
    const reward = rewardForLevel();
    const previousReward = rewardForLevel(level.number - 1);
    const rewardMessage = reward.id !== previousReward.id
      ? `<div class="reward-unlock"><span>🎟️</span><div><small>Fictional reward unlocked</small><strong>${esc(reward.name)}</strong></div></div>`
      : "";
    const content = storyMode
      ? `<div class="scene-card conclusion"><div class="scene-characters"><span>👩🏽‍🍳</span><span>🎉</span></div><p class="eyebrow">Chapter ${level.number} complete</p><h1>${level.number === 6 ? "Burger Borough takes back the block." : "The comeback continues."}</h1><p>${esc(level.outro)}</p></div>`
      : `<div class="level-card"><p class="eyebrow">Level ${level.number} complete</p><h1>${level.orders.length} orders served</h1><p>The next level adds another food chain and a larger order goal.</p></div>`;
    const nextButton = level.number < 6
      ? `<button class="primary" data-action="next-level">Continue</button>`
      : `<button class="primary" data-action="finish-game">View game results</button>`;
    screen.innerHTML = `${content}${rewardMessage}<div class="metrics"><div><small>Level score</small><strong>${state.levelScores[level.number - 1]}</strong></div><div><small>Merges</small><strong>${state.levelMerges[level.number - 1]}</strong></div><div><small>Energy used</small><strong>${state.levelEnergyUsed[level.number - 1]}</strong></div><div><small>Play time</small><strong>${formatTime(state.levelTimes[level.number - 1])}</strong></div></div>${nextButton}${exitButton()}`;
    save();
    updateHeader();
  }

  function renderExitConfirm() {
    screen.innerHTML = `<p class="eyebrow">End gameplay?</p><h1>You can return to the survey now.</h1><p>Your completed levels, score, merges, energy use, restarts, and gameplay time will be included in the result.</p><div class="button-row"><button class="secondary" data-action="resume">Keep playing</button><button class="primary" data-action="confirm-exit">End gameplay</button></div>`;
  }

  function totalActiveSeconds() { return state.levelTimes.reduce((sum, value) => sum + value, 0); }

  function renderResults() {
    pauseLevelClock();
    state.screen = "results";
    save();
    postProgress();
    const totalRestarts = state.restarts.reduce((sum, value) => sum + value, 0);
    const content = storyMode
      ? `<div class="results-hero"><span>👩🏽‍🍳</span><div><small>Chef Bea's progress</small><strong>${state.completedLevel >= 5 ? "Burger Borough is safe." : "Burger Borough's comeback has begun."}</strong></div></div>`
      : "";
    screen.innerHTML = `<p class="eyebrow">${state.endedEarly ? "Gameplay ended" : "Game complete"}</p><h1>Your Burger Borough results</h1>${content}<div class="results-grid"><div><small>Levels completed</small><strong>${state.completedLevel}/6</strong></div><div><small>Orders served</small><strong>${state.ordersServed}</strong></div><div><small>Total score</small><strong>${state.totalScore}</strong></div><div><small>Merges</small><strong>${state.merges}</strong></div><div><small>Drag merges</small><strong>${state.dragMerges}</strong></div><div><small>Drag serves</small><strong>${state.dragServes}</strong></div><div><small>Generator taps</small><strong>${state.generatorTaps}</strong></div><div><small>Energy used</small><strong>${state.levelEnergyUsed.reduce((a, b) => a + b, 0)}</strong></div><div><small>Restarts</small><strong>${totalRestarts}</strong></div><div><small>Active gameplay</small><strong>${formatTime(totalActiveSeconds())}</strong></div></div><button class="primary" data-action="view-reward">View earned reward</button>`;
    updateHeader();
  }

  function rewardPass(reward) {
    if (reward.id === "none") return `<div class="reward-pass locked"><h2>No food discount unlocked</h2><p>Additional gameplay would be required to unlock a fictional study reward.</p></div>`;
    return `<div class="reward-pass"><div class="pass-top"><span>BURGER BOROUGH</span><b>IN-STORE REWARD PASS</b></div><div class="pass-body"><small>STUDY OFFER</small><h2>${esc(reward.name)}</h2><p>In-store redemption would be required.</p></div><div class="barcode" aria-hidden="true"></div><div class="pass-code">BB-${reward.id.toUpperCase()}-${String(state.totalScore).padStart(4, "0")}</div><div class="pass-terms">FICTIONAL · RESEARCH ONLY · NO CASH VALUE · NOT REDEEMABLE</div></div>`;
  }

  function renderReward() {
    state.screen = "reward";
    const reward = rewardForLevel();
    screen.innerHTML = `<p class="eyebrow">Earned reward</p><h1>${reward.id === "none" ? "No reward was unlocked." : "Your fictional reward pass"}</h1>${rewardPass(reward)}${reward.id === "none" ? `<button class="primary" data-reward="none">Continue</button>` : `<h2>What would you do with this fictional reward?</h2><div class="choice-list"><button class="choice" data-reward="redeem">Redeem it during an in-person Burger Borough visit</button><button class="choice" data-reward="save">Save it for a future in-person visit</button><button class="choice" data-reward="decline">Choose not to use it</button></div>`}<div class="notice">Burger Borough, Pizza Pleasure Palace, Borough Bucks, and all displayed rewards are fictional and were created only for this research experience.</div>`;
    save();
  }

  function connectedToSurvey() {
    return window.parent !== window;
  }

  function renderContinue() {
    state.screen = "continue";
    const connected = connectedToSurvey();
    screen.innerHTML = `<p class="eyebrow">${connected ? "Ready to continue" : "Preview mode"}</p><h1>${connected ? "Return to the survey" : "Preview complete"}</h1><p>${connected ? "Your gameplay summary is ready to be transferred to the survey." : "This standalone preview is not connected to a Qualtrics response, so no study data has been sent."}</p><button class="primary" data-action="return-survey">${connected ? "Send Results and Continue to Survey" : "Finish Preview"}</button><div id="returnMessage"></div>`;
    save();
  }

  function compact(values) { return values.map(value => Math.round(value)).join(","); }

  function resultPayload() {
    return {
      bb_condition: pathCode,
      bb_game_version: BUILD,
      bb_completed_level: String(state.completedLevel),
      bb_current_level: String(state.level),
      bb_total_score: String(state.totalScore),
      bb_reward_tier: rewardForLevel().id,
      bb_reward_choice: state.rewardChoice || "none",
      bb_ended_early: String(state.endedEarly),
      bb_exit_reason: state.exitReason || "completed",
      bb_total_seconds: String(Math.round((Date.now() - state.startedAt) / 1000)),
      bb_active_seconds: String(Math.round(totalActiveSeconds())),
      bb_level_times: compact(state.levelTimes),
      bb_level_scores: compact(state.levelScores),
      bb_level_merges: compact(state.levelMerges),
      bb_level_energy_used: compact(state.levelEnergyUsed),
      bb_restarts: compact(state.restarts),
      bb_generator_taps: String(state.generatorTaps),
      bb_merges: String(state.merges),
      bb_orders_served: String(state.ordersServed),
      bb_invalid_moves: String(state.invalidMoves),
      bb_drag_attempts: String(state.dragAttempts),
      bb_drag_merges: String(state.dragMerges),
      bb_drag_moves: String(state.dragMoves),
      bb_drag_serves: String(state.dragServes),
      bb_failed_drops: String(state.failedDrops)
    };
  }

  function postProgress() {
    if (window.parent !== window) window.parent.postMessage({ type: "burger-borough-progress", payload: resultPayload() }, "*");
  }

  function returnToSurvey() {
    const payload = resultPayload();
    const embedded = window.parent !== window;
    if (embedded) window.parent.postMessage({ type: "burger-borough-complete", payload }, "*");
    const message = document.querySelector("#returnMessage");
    if (message) message.innerHTML = embedded
      ? `<div class="notice"><strong>Sending results…</strong> Please keep this page open while Burger Borough returns you to the survey.</div>`
      : `<div class="notice"><strong>Preview finished.</strong> No data was sent to Qualtrics.</div>`;
  }

  if (typeof window.addEventListener === "function") {
    window.addEventListener("message", event => {
      if (event.source !== window.parent || !event.data) return;
      if (event.data.type === "burger-borough-received") {
        state.finalized = true;
        save();
        const message = document.querySelector("#returnMessage");
        if (message) message.innerHTML = `<div class="notice"><strong>Results received.</strong> Returning to the survey…</div>`;
      } else if (event.data.type === "burger-borough-error") {
        const message = document.querySelector("#returnMessage");
        if (message) message.innerHTML = `<div class="notice"><strong>The survey did not accept the game results.</strong> Please notify the study team instead of closing this page.</div>`;
      }
    });
  }

  function restoreScreen() {
    if (state.screen === "brief") renderBrief();
    else if (state.screen === "play") renderPlay();
    else if (state.screen === "complete") renderComplete();
    else if (state.screen === "results") renderResults();
    else if (state.screen === "reward") renderReward();
    else if (state.screen === "continue") renderContinue();
    else renderIntro();
  }

  function clearDropHighlight() {
    if (highlightedDrop && highlightedDrop.classList) {
      highlightedDrop.classList.remove("drop-valid", "drop-invalid");
    }
    highlightedDrop = null;
  }

  function setDropHighlight(target, valid) {
    if (highlightedDrop === target) {
      if (target && target.classList) {
        target.classList.toggle("drop-valid", valid);
        target.classList.toggle("drop-invalid", !valid);
      }
      return;
    }
    clearDropHighlight();
    highlightedDrop = target;
    if (target && target.classList) target.classList.add(valid ? "drop-valid" : "drop-invalid");
  }

  function actualDropTarget(clientX, clientY, fallbackTarget) {
    const element = typeof document.elementFromPoint === "function"
      ? document.elementFromPoint(clientX, clientY)
      : fallbackTarget;
    return element && typeof element.closest === "function"
      ? element.closest(".board-cell, .order")
      : null;
  }

  function isValidDropTarget(target, sourceIndex) {
    const source = state.board[sourceIndex];
    if (!target || !source) return false;
    if (target.dataset.cell !== undefined) {
      const targetIndex = Number(target.dataset.cell);
      if (!Number.isInteger(targetIndex) || targetIndex === sourceIndex) return false;
      const targetTile = state.board[targetIndex];
      return !targetTile || (source.food === targetTile.food && source.tier === targetTile.tier && source.tier < 3);
    }
    if (target.dataset.order !== undefined) {
      const orderIndex = Number(target.dataset.order);
      const requested = currentLevel().orders[orderIndex];
      return Boolean(requested && !state.orderDone[orderIndex] && source.food === requested.food && source.tier === requested.tier);
    }
    return false;
  }

  function createDragGhost(sourceElement) {
    if (typeof document.createElement !== "function" || !document.body) return null;
    const ghost = document.createElement("div");
    ghost.className = "drag-ghost";
    ghost.setAttribute("aria-hidden", "true");
    ghost.innerHTML = sourceElement.innerHTML;
    document.body.appendChild(ghost);
    return ghost;
  }

  function positionDragGhost(ghost, clientX, clientY) {
    if (ghost) ghost.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
  }

  function finishPointerDrag() {
    if (!pointerDrag) return;
    clearDropHighlight();
    if (pointerDrag.sourceElement && pointerDrag.sourceElement.classList) pointerDrag.sourceElement.classList.remove("drag-origin");
    if (pointerDrag.ghost && typeof pointerDrag.ghost.remove === "function") pointerDrag.ghost.remove();
    if (pointerDrag.sourceElement && typeof pointerDrag.sourceElement.releasePointerCapture === "function") {
      try { pointerDrag.sourceElement.releasePointerCapture(pointerDrag.pointerId); } catch (_error) {}
    }
    pointerDrag = null;
  }

  document.addEventListener("pointerdown", event => {
    if (state.screen !== "play" || event.isPrimary === false || (event.button !== undefined && event.button !== 0)) return;
    const tile = event.target && typeof event.target.closest === "function" ? event.target.closest(".board-cell.tile") : null;
    if (!tile) return;
    const sourceIndex = Number(tile.dataset.cell);
    if (!Number.isInteger(sourceIndex) || !state.board[sourceIndex]) return;
    pointerDrag = {
      pointerId: event.pointerId,
      sourceIndex,
      sourceElement: tile,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      ghost: null
    };
    if (typeof tile.setPointerCapture === "function") {
      try { tile.setPointerCapture(event.pointerId); } catch (_error) {}
    }
  });

  document.addEventListener("pointermove", event => {
    if (!pointerDrag || event.pointerId !== pointerDrag.pointerId) return;
    const distance = Math.hypot(event.clientX - pointerDrag.startX, event.clientY - pointerDrag.startY);
    if (!pointerDrag.dragging && distance < DRAG_THRESHOLD) return;
    if (!pointerDrag.dragging) {
      pointerDrag.dragging = true;
      state.dragAttempts += 1;
      state.selectedCell = pointerDrag.sourceIndex;
      pointerDrag.ghost = createDragGhost(pointerDrag.sourceElement);
      if (pointerDrag.sourceElement.classList) pointerDrag.sourceElement.classList.add("drag-origin");
    }
    if (typeof event.preventDefault === "function") event.preventDefault();
    positionDragGhost(pointerDrag.ghost, event.clientX, event.clientY);
    const target = actualDropTarget(event.clientX, event.clientY, event.target);
    setDropHighlight(target, isValidDropTarget(target, pointerDrag.sourceIndex));
  });

  document.addEventListener("pointerup", event => {
    if (!pointerDrag || event.pointerId !== pointerDrag.pointerId) return;
    if (!pointerDrag.dragging) {
      finishPointerDrag();
      return;
    }
    if (typeof event.preventDefault === "function") event.preventDefault();
    const sourceIndex = pointerDrag.sourceIndex;
    const target = actualDropTarget(event.clientX, event.clientY, event.target);
    suppressTileClickUntil = Date.now() + 450;
    finishPointerDrag();
    if (!target) {
      state.failedDrops += 1;
      state.invalidMoves += 1;
      state.status = "The piece was not dropped on the board or an order.";
      renderPlay();
    } else if (target.dataset.order !== undefined) {
      serveOrderFromCell(Number(target.dataset.order), sourceIndex, true);
    } else {
      dropTileOnCell(sourceIndex, Number(target.dataset.cell));
    }
  });

  document.addEventListener("pointercancel", event => {
    if (!pointerDrag || event.pointerId !== pointerDrag.pointerId) return;
    if (pointerDrag.dragging) state.failedDrops += 1;
    finishPointerDrag();
    save();
  });

  document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "begin") {
      state.screen = "brief";
      renderBrief();
    } else if (action === "start-level") {
      setupLevel();
      renderPlay();
    } else if (button.dataset.generate) {
      generate(button.dataset.generate);
    } else if (button.dataset.cell !== undefined) {
      if (Date.now() < suppressTileClickUntil) return;
      selectCell(Number(button.dataset.cell));
    } else if (button.dataset.order !== undefined) {
      serveOrder(Number(button.dataset.order));
    } else if (action === "clear-selection") {
      state.selectedCell = -1;
      state.status = "Selection cleared.";
      renderPlay();
    } else if (action === "restart-level") {
      restartLevel();
    } else if (action === "next-level") {
      state.level += 1;
      state.screen = "brief";
      renderBrief();
    } else if (action === "finish-game") {
      renderResults();
    } else if (action === "request-exit") {
      state.resumeScreen = state.screen;
      pauseLevelClock();
      renderExitConfirm();
    } else if (action === "resume") {
      state.screen = state.resumeScreen || "brief";
      if (state.screen === "play") state.levelActiveSince = Date.now();
      restoreScreen();
    } else if (action === "confirm-exit") {
      state.endedEarly = true;
      state.exitReason = `voluntary_level_${state.level}`;
      renderResults();
    } else if (action === "view-reward") {
      renderReward();
    } else if (button.dataset.reward) {
      state.rewardChoice = button.dataset.reward;
      renderContinue();
    } else if (action === "return-survey") {
      returnToSurvey();
    }
    updateHeader();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseLevelClock();
    else resumeLevelClock();
    save();
  });

  restoreScreen();
})();

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const categories = require("./questions");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ لازم تحط BOT_TOKEN في ملف .env");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// حالة كل مستخدم أثناء الاختبار (في الذاكرة فقط)
// { categoryKey, order: [أرقام الأسئلة بترتيب عشوائي], index, score }
const userState = new Map();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sendCategoriesMenu(chatId, text = "اختار تصنيف الاختبار اللي عايز تبدأ بيه:") {
  const keyboard = Object.entries(categories).map(([key, cat]) => [
    { text: cat.label, callback_data: `cat:${key}` },
  ]);
  bot.sendMessage(chatId, text, { reply_markup: { inline_keyboard: keyboard } });
}

function sendQuestion(chatId, userId) {
  const state = userState.get(userId);
  const cat = categories[state.categoryKey];
  const qIndex = state.order[state.index];
  const q = cat.questions[qIndex];

  const keyboard = q.options.map((opt, i) => [
    { text: opt, callback_data: `ans:${i}` },
  ]);

  bot.sendMessage(
    chatId,
    `❓ سؤال ${state.index + 1} من ${state.order.length}\n\n${q.question}`,
    { reply_markup: { inline_keyboard: keyboard } }
  );
}

// أمر البداية
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `أهلاً بيك في *Raghad* 🤖\nأنا بوت اختبارات برمجة، هساعدك تذاكر وتختبر نفسك بأسئلة اختيار من متعدد.`,
    { parse_mode: "Markdown" }
  );
  sendCategoriesMenu(msg.chat.id);
});

// أمر عرض النتيجة
bot.onText(/\/score/, (msg) => {
  const state = userState.get(msg.from.id);
  if (!state) {
    bot.sendMessage(msg.chat.id, "مفيش اختبار شغال دلوقتي. ابعت /start عشان تبدأ.");
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    `📊 نتيجتك الحالية: ${state.score} من ${state.index} أسئلة مجاوبة.`
  );
});

// أمر القائمة تاني
bot.onText(/\/menu/, (msg) => sendCategoriesMenu(msg.chat.id));

// الرد على الأزرار (اختيار تصنيف أو إجابة)
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  if (data.startsWith("cat:")) {
    const categoryKey = data.split(":")[1];
    const cat = categories[categoryKey];
    const order = shuffle(cat.questions.map((_, i) => i));

    userState.set(userId, { categoryKey, order, index: 0, score: 0 });

    await bot.answerCallbackQuery(query.id);
    await bot.sendMessage(chatId, `🚀 بدأنا اختبار ${cat.label}!`);
    sendQuestion(chatId, userId);
    return;
  }

  if (data.startsWith("ans:")) {
    const state = userState.get(userId);
    if (!state) {
      await bot.answerCallbackQuery(query.id, { text: "ابعت /start الأول" });
      return;
    }

    const chosenIndex = parseInt(data.split(":")[1], 10);
    const cat = categories[state.categoryKey];
    const qIndex = state.order[state.index];
    const q = cat.questions[qIndex];
    const isCorrect = chosenIndex === q.correctIndex;

    if (isCorrect) state.score += 1;
    state.index += 1;

    await bot.answerCallbackQuery(query.id, {
      text: isCorrect ? "✅ إجابة صح!" : `❌ غلط، الصح كان: ${q.options[q.correctIndex]}`,
      show_alert: true,
    });

    if (state.index >= state.order.length) {
      await bot.sendMessage(
        chatId,
        `🏁 خلصت الاختبار!\nنتيجتك: ${state.score} من ${state.order.length}`
      );
      userState.delete(userId);
      sendCategoriesMenu(chatId, "عايز تجرب تصنيف تاني؟");
    } else {
      sendQuestion(chatId, userId);
    }
  }
});

console.log("✅ Raghad bot شغال دلوقتي...");

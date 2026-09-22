/**
 * Web Speech API Voice Guidance Assistant
 * Speaks out scheme matching results and key benefits in selected language.
 */

export function speakText(text, lang = "en") {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis is not supported on this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Map language codes to BCP-47 tags
  const langMap = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
    ta: "ta-IN"
  };

  utterance.lang = langMap[lang] || "en-IN";
  utterance.rate = 0.95; // gentle, easy-to-understand pace
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
}

export function generateVoiceSummary(profile, topScheme, lang = "en") {
  if (!topScheme) {
    if (lang === "hi") {
      return "नमस्ते! कृपया अपनी जानकारी भरें ताकि हम आपके लिए सबसे अच्छी सरकारी रियायती ऋण योजना ढूंढ सकें।";
    }
    return "Hello! Please fill your enterprise profile to find eligible government concessional schemes.";
  }

  if (lang === "hi") {
    return `नमस्ते ${profile.fullName || "उद्यमी"} जी। आपके लिए सबसे उपयुक्त योजना है: ${topScheme.title}। इसमें आपको ${topScheme.concessionalRate}% की रियायती ब्याज दर पर ऋण मिलेगा।`;
  }

  if (lang === "mr") {
    return `नमस्कार ${profile.fullName || "उद्योजक"} जी! तुमच्यासाठी सर्वोत्तम योजना आहे: ${topScheme.title}. यामध्ये तुम्हाला फक्त ${topScheme.concessionalRate}% सवलतीच्या दरात कर्ज मिळेल.`;
  }

  if (lang === "ta") {
    return `வணக்கம்! உங்களுக்கான சிறந்த திட்டம்: ${topScheme.title}. இதில் ${topScheme.concessionalRate}% சலுகை வட்டியில் கடன் பெறலாம்.`;
  }

  return `Hello ${profile.fullName || "entrepreneur"}! Your highest matched scheme is ${topScheme.title} with a ${topScheme.matchScore}% eligibility match. You qualify for a concessional interest rate of ${topScheme.concessionalRate}% per annum.`;
}

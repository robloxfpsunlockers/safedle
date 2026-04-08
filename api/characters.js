// Vercel Serverless Function - /api/characters
// Safebooru se characters fetch karta hai - completely SFW

// Popular SFW anime/game characters list with their Safebooru tag names
const CHARACTER_TAGS = [
  // Naruto
  { tag: "naruto_uzumaki", note: "Naruto", is_franchise: false },
  { tag: "hinata_hyuga", note: "Naruto", is_franchise: false },
  { tag: "sakura_haruno", note: "Naruto", is_franchise: false },
  { tag: "tsunade", note: "Naruto", is_franchise: false },
  { tag: "ino_yamanaka", note: "Naruto", is_franchise: false },
  { tag: "temari", note: "Naruto", is_franchise: false },

  // Attack on Titan
  { tag: "mikasa_ackerman", note: "Attack on Titan", is_franchise: false },
  { tag: "annie_leonhart", note: "Attack on Titan", is_franchise: false },
  { tag: "historia_reiss", note: "Attack on Titan", is_franchise: false },
  { tag: "hange_zoe", note: "Attack on Titan", is_franchise: false },

  // Pokemon
  { tag: "pikachu", note: "Pokémon", is_franchise: false },
  { tag: "gardevoir", note: "Pokémon", is_franchise: false },
  { tag: "lucario", note: "Pokémon", is_franchise: false },
  { tag: "eevee", note: "Pokémon", is_franchise: false },
  { tag: "sylveon", note: "Pokémon", is_franchise: false },
  { tag: "charizard", note: "Pokémon", is_franchise: false },
  { tag: "mewtwo", note: "Pokémon", is_franchise: false },
  { tag: "gengar", note: "Pokémon", is_franchise: false },
  { tag: "umbreon", note: "Pokémon", is_franchise: false },

  // Mario
  { tag: "princess_peach", note: "Mario", is_franchise: false },
  { tag: "rosalina", note: "Mario", is_franchise: false },
  { tag: "bowser", note: "Mario", is_franchise: false },

  // Zelda
  { tag: "princess_zelda", note: "Zelda", is_franchise: false },
  { tag: "link", note: "Zelda", is_franchise: false },
  { tag: "midna", note: "Zelda", is_franchise: false },

  // NieR
  { tag: "2b_(nier:automata)", note: "NieR: Automata", is_franchise: false },
  { tag: "a2_(nier:automata)", note: "NieR: Automata", is_franchise: false },
  { tag: "9s_(nier:automata)", note: "NieR: Automata", is_franchise: false },

  // Final Fantasy
  { tag: "tifa_lockhart", note: "Final Fantasy VII", is_franchise: false },
  { tag: "aerith_gainsborough", note: "Final Fantasy VII", is_franchise: false },
  { tag: "cloud_strife", note: "Final Fantasy VII", is_franchise: false },
  { tag: "lightning_(ff13)", note: "Final Fantasy XIII", is_franchise: false },

  // Re:Zero
  { tag: "rem_(re:zero)", note: "Re:Zero", is_franchise: false },
  { tag: "emilia_(re:zero)", note: "Re:Zero", is_franchise: false },
  { tag: "ram_(re:zero)", note: "Re:Zero", is_franchise: false },

  // SAO
  { tag: "asuna_(sao)", note: "Sword Art Online", is_franchise: false },
  { tag: "kirito", note: "Sword Art Online", is_franchise: false },
  { tag: "sinon", note: "Sword Art Online", is_franchise: false },

  // Vocaloid
  { tag: "hatsune_miku", note: "Vocaloid", is_franchise: false },
  { tag: "kagamine_rin", note: "Vocaloid", is_franchise: false },
  { tag: "megurine_luka", note: "Vocaloid", is_franchise: false },

  // Dragon Ball
  { tag: "bulma_(dragon_ball)", note: "Dragon Ball", is_franchise: false },
  { tag: "android_18", note: "Dragon Ball", is_franchise: false },
  { tag: "chi-chi_(dragon_ball)", note: "Dragon Ball", is_franchise: false },

  // My Hero Academia
  { tag: "momo_yaoyorozu", note: "My Hero Academia", is_franchise: false },
  { tag: "ochako_uraraka", note: "My Hero Academia", is_franchise: false },
  { tag: "toga_himiko", note: "My Hero Academia", is_franchise: false },
  { tag: "tsuyu_asui", note: "My Hero Academia", is_franchise: false },
  { tag: "deku_(my_hero_academia)", note: "My Hero Academia", is_franchise: false },

  // One Piece
  { tag: "nami_(one_piece)", note: "One Piece", is_franchise: false },
  { tag: "nico_robin", note: "One Piece", is_franchise: false },
  { tag: "boa_hancock", note: "One Piece", is_franchise: false },

  // Overwatch
  { tag: "tracer_(overwatch)", note: "Overwatch", is_franchise: false },
  { tag: "mercy_(overwatch)", note: "Overwatch", is_franchise: false },
  { tag: "d.va_(overwatch)", note: "Overwatch", is_franchise: false },
  { tag: "widowmaker_(overwatch)", note: "Overwatch", is_franchise: false },

  // Fire Emblem
  { tag: "lucina_(fire_emblem)", note: "Fire Emblem", is_franchise: false },
  { tag: "camilla_(fire_emblem_if)", note: "Fire Emblem", is_franchise: false },
  { tag: "byleth_(fire_emblem)", note: "Fire Emblem", is_franchise: false },

  // Genshin Impact
  { tag: "hu_tao_(genshin_impact)", note: "Genshin Impact", is_franchise: false },
  { tag: "ganyu_(genshin_impact)", note: "Genshin Impact", is_franchise: false },
  { tag: "keqing_(genshin_impact)", note: "Genshin Impact", is_franchise: false },
  { tag: "raiden_shogun_(genshin_impact)", note: "Genshin Impact", is_franchise: false },
  { tag: "yae_miko_(genshin_impact)", note: "Genshin Impact", is_franchise: false },
  { tag: "lumine_(genshin_impact)", note: "Genshin Impact", is_franchise: false },

  // Demon Slayer
  { tag: "nezuko_kamado", note: "Demon Slayer", is_franchise: false },
  { tag: "shinobu_kocho", note: "Demon Slayer", is_franchise: false },
  { tag: "mitsuri_kanroji", note: "Demon Slayer", is_franchise: false },

  // Spy x Family
  { tag: "anya_forger", note: "Spy x Family", is_franchise: false },
  { tag: "yor_forger", note: "Spy x Family", is_franchise: false },

  // Chainsaw Man
  { tag: "power_(chainsaw_man)", note: "Chainsaw Man", is_franchise: false },
  { tag: "makima_(chainsaw_man)", note: "Chainsaw Man", is_franchise: false },

  // Franchises
  { tag: "naruto", note: "Franchise", is_franchise: true },
  { tag: "pokemon", note: "Franchise", is_franchise: true },
  { tag: "one_piece", note: "Franchise", is_franchise: true },
  { tag: "dragon_ball", note: "Franchise", is_franchise: true },
  { tag: "genshin_impact", note: "Franchise", is_franchise: true },
  { tag: "my_hero_academia", note: "Franchise", is_franchise: true },
  { tag: "sword_art_online", note: "Franchise", is_franchise: true },
  { tag: "attack_on_titan", note: "Franchise", is_franchise: true },
  { tag: "re:zero", note: "Franchise", is_franchise: true },
];

async function fetchTagFromSafebooru(tag) {
  const url = `https://safebooru.org/index.php?page=dapi&s=tag&q=index&json=1&name=${encodeURIComponent(tag)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; GameBot/1.0)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Safebooru returns array
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

async function fetchImageForTag(tag) {
  // Get one post image for this tag from Safebooru
  try {
    const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tag + " solo")}&limit=10&pid=0`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GameBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return null;

    // Pick best image: prefer ones with good dimensions
    for (const post of posts) {
      if (post.sample_url && post.width > 200) {
        return post.sample_url;
      }
      if (post.preview_url) {
        return post.preview_url;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const includeFranchises = req.query.includeFranchises !== "false";

  try {
    // Filter tags based on franchise toggle
    const tagsToFetch = includeFranchises
      ? CHARACTER_TAGS
      : CHARACTER_TAGS.filter((c) => !c.is_franchise);

    // Fetch all tags in parallel (batches of 10 to avoid rate limiting)
    const results = [];
    const batchSize = 10;

    for (let i = 0; i < tagsToFetch.length; i += batchSize) {
      const batch = tagsToFetch.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(async (charInfo) => {
          try {
            const tagData = await fetchTagFromSafebooru(charInfo.tag);
            if (!tagData || !tagData.count || tagData.count < 10) return null;

            // Fetch image for this character
            const imageUrl = await fetchImageForTag(charInfo.tag);

            return {
              tag_name: charInfo.tag,
              post_count: parseInt(tagData.count),
              image_url: imageUrl,
              note: charInfo.note,
              is_franchise: charInfo.is_franchise,
            };
          } catch {
            return null;
          }
        })
      );

      batchResults.forEach((r) => {
        if (r.status === "fulfilled" && r.value !== null) {
          results.push(r.value);
        }
      });
    }

    // Filter out characters with 0 posts and sort by post count
    const validResults = results
      .filter((r) => r && r.post_count > 0)
      .sort((a, b) => b.post_count - a.post_count);

    if (validResults.length === 0) {
      return res.status(503).json({ error: "No character data available" });
    }

    // Cache for 1 hour
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
    return res.status(200).json(validResults);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Failed to fetch character data" });
  }
}

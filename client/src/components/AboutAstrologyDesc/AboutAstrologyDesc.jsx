import React, { useState } from 'react'
// this page displays all the info for my about astrology page..this component is called on the aboutAstrology.js page
const AboutAstrologyDesc = () => {
  // this is where Im setting spots to travel to on my about page for astrology
  const [info] = useState([['Dualities', '#dual'], ["Triplicities", "#trip"], ["Quadruplicities", "#quad"], ["Polarities", "#polar"]])
  return (
    <>
      <div className="text-center container">
        <div className="mt-5 d-flex justify-content-evenly">
          {info.map((cat, idx) => {
            return <a href={cat[1]} key={idx} className="aboutAstrologyLinks">{cat[0]}</a>
          })}
        </div>
        <h1 className="mt-5 mainAboutTitle">What is a Sun Sign?</h1>
        <div className="mt-4">
          <p className="aboutAstrologyDesc">From our viewpoint here on Earth, the Sun travels around the Earth once each year. Within the space of that year the Sun moves through all twelve signs of the zodiac, spending approximately one month in each sign. The sign that the Sun was traveling through at the time of your birth is your sun sign.</p>
          <p className="aboutAstrologyDesc">The sun is our most powerful planet. (In astrological terms, the Sun is referred to as a planet even though it, like the Moon, is actually a "luminary.") It gives us life, warmth, energy, food. It is the force that sustains us on Earth. The Sun is also the most important and pervasive influence in your horoscope, and in many way determines how others see you. The position of the Sun in your birth chart governs your individuality, your distinctive style, and your drive to fulfill your goals in life.</p>
          <p className="aboutAstrologyDesc">I often liken your Sun sign to the role you've been given in your grand drama. One can think (as Shakespeare did) of life as a play that one enters into at the time of birth. You are the leading actor in this drama, and the role you are acting is your Sun sign.</p>
          <p className="aboutAstrologyDesc">Another analogy is that your horoscope is a painting of you. The characteristics of your Sun sign are the broad strokes that the artist first lays down on the canvas. The artist outlines your general shape, the planes and angles of your face, the way in which you hold your body. In the same way, your Sun sign delineates your general character. Are you introspective? Do you make friends easily? How do you cope with responsibility? Are you high-strung or easygoing? The answers may be found in a study of your Sun sign.</p>
          <p className="aboutAstrologyDesc">Yet a typical remark often made to astrologers goes something like this: "I'm a Capricorn, but when I read those descriptions of Capricorn, they don't describe me very accurately."</p>
          <p className="aboutAstrologyDesc">Remember, the Sun sign is just the start of your portrait, the broad strokes. You also have a moon in your birth chart, and it's probably in a different sign from the one the Sun is in. You have planets in your birth chart, and each may be a different sign.</p>
          <p className="aboutAstrologyDesc">You are a complex and unique combination, unlike anyone else. Any attempt to give an accurate description from only a Sun sign falls into the kind of error H.L. Mencken was referring to when he remarked that "for every complicated problem, there is a solution that is short, simple, and wrong."</p>
          <p className="aboutAstrologyDesc">Only by studying the entire birth chart can an astrologer begin to get a complete picture of a personality. Even then, there is a certain latitude for error simply because human beings are not carved in stone. We change a little every day and with every person we meet. Love, tragedy, success - each circumstance of life alters us. However, the essential person remains. Ans the Sun sign is the outline of that essence.</p>
          <p className="aboutAstrologyDesc">Astrology is a fascinating tool for the study of human nature. When you first meet someone, that person is a mystery. You see the color of eyes and hair, the mode of dress, whether he or she is tall or short. You must wait for further information to know anything more. If you know the person's Sun sign, you can put a few pieces of the puzzle together. But, just as when you are beginning a complex jigsaw puzzle, too many pieces are missing. The Sun sign merely gives you an edge, an extra insight that you would not otherwise possess.</p>
          <p className="aboutAstrologyDesc">Of course, knowledge of Sun signs is not only useful in casual social meetings. It is invaluable in close relationships. If your Cancer husband nags and criticizes, you'll know it's just his way of showing how much he cares about you. If your ten-year-old Virgo daughter acts like a premature old maid, fussing about putting everything exactly where she wants it, you'll understand why she needs to have her possessions neatly arranged. Knowing how scattered and forgetful a Gemini can be, you will find it easier to forgive your Gemini lover when your birthday present shows up two days late.</p>
          <p className="aboutAstrologyDesc">Most important of all, an understanding of your own Sun sign will give you an added measure of self-knowledge, a deeper insight into the stranger that is yourself.</p>
        </div>
        <div id="dual">
          <h1 className="mainAboutTitle">Dualities</h1>
          <p className="aboutAstrologyDesc">The twelve signs are divided into two groups, masculine and feminine. Six signs are masculine, and six are feminine. This is known as the sign's duality. In astrological terms, a masculine sign is direct and energetic; a feminine sign is receptive and magnetic. These masculine and feminine attributes were given to the signs about 2,000 years ago. Today modern astrologers try to avoid the sexism implicit in these distinctions. A masculine sign does not mean "positive and forceful" any more than a feminine sign means "negative and weak." In modern terminology, the masculine signs are defined as outer-directed and strong through action. The feminine signs are self-contained and strong through inner reserves.</p>
        </div>
        <div id="trip">
          <h1 className="mainAboutTitle">Triplicities</h1>
          <p className="aboutAstrologyDesc">The twelve signs are also divided into four groups containing three signs each. Each three-sign group is called a triplicity, and each of these triplicities denotes an element. The four elements are Fire, Earth, Air, and Water. In astrology, an element symbolizes a fundamental characterization of the sign.</p>
          <p className="aboutAstrologyDesc">Three signs are fire signs. They are Aries, Leo, and Sagittarius. Fire signs are active and enthusiastic.</p>
          <p className="aboutAstrologyDesc">Three signs are earth signs. They are Taurus, Virgo, and Capricorn. Earth signs are practical and stable.</p>
          <p className="aboutAstrologyDesc">Three signs are air signs. They are Gemini, Libra, and Aquarius. Air signs are intellectual and communicative.</p>
          <p className="aboutAstrologyDesc">Three signs are water signs. They are Cancer, Scorpio, and Pisces. Water signs are emotional and intuitive.</p>
        </div>
        <div id="quad">
          <h1 className="mainAboutTitle">Quadruplicities</h1>
          <p className="aboutAstrologyDesc">Next, the twelve signs are divided into three groups containing four signs each. Each four-sign group is called a quadruplicity, and each of these quadruplicities denotes a quality. The three qualities are Cardinal, Fixed, and Mutable. In astrology, the quality signifies the sign's interaction with the outside world.</p>
          <p className="aboutAstrologyDesc">Four signs are Cardinal signs. They are Aries, Cancer, Libra, and Capricorn. Cardinal signs are enterprising and outgoing. They are the initiators.</p>
          <p className="aboutAstrologyDesc">Four signs are fixed signs. They are Taurus, Leo, Scorpio, and Aquarius. Fixed signs are resistant to change. They are perfecters and finishers, rather than originators.</p>
          <p className="aboutAstrologyDesc">Four signs are Mutable. They are Gemini, Virgo, Sagittarius, and Pisces. Mutable signs are flexible, versatile, and adaptable. They are able to adjust to differing circumstances.</p>
        </div>
        <div>
          <p className="aboutAstrologyDesc">You will notice that each of the twelve signs falls into a different combination. No one sign in the zodiac has exactly the same duality, element, and quality as another sign. For example, Aries is a Masculine, Fire, Cardinal sign; there is no other Masculine, Fire, Cardinal sign in the zodiac.</p>
          <p className="aboutAstrologyDesc">Because each sign is a unique combination, each sign expresses the characteristics of its quality, element, and duality differently.</p>
          <p className="aboutAstrologyDesc">Example: Aries is Masculine, meaning it is active rather than receptive; Fire, meaning it is excitable and energetic; Cardinal, meaning it is outgoing and open to new experiences. The sign of a Leo is also Masculine and Fire, but unlike Aries (which is Cardinal) Leo is Fixed. Therefore Leo is extroverted and passionate like Aries, but also firm in its opinions, convinced of being on the side of truth in its passions, and not as willing as Aries to abandon an unworkable plan and go on to something new.</p>
        </div>
        <div id="polar">
          <h1 className="mainAboutTitle">Polarities</h1>
          <p className="aboutAstrologyDesc">Finally, the twelve signs are divided into six groups containing two signs each. Each two-sign group is called a polarity (meaning 'opposite'). Each sign in the zodiac has a polarity, which is its opposite sign in the other half of the zodiac. The two signs express opposite characteristics.</p>
          <p className="aboutAstrologyDesc">Aries and Libra are a polarity. Aries is the sign of self. The opposite sign, Libra, is the sign of partnership. Taurus and Scorpio are a polarity. Taurus is the sign of personal possessions. The opposite, Scorpio, is the sign of legacies and shared possessions.
          </p>
          <p className="aboutAstrologyDesc">Gemini and Sagittarius are a polarity. Gemini is the sign of self-expression. The opposite sign, Sagittarius, is the sign of philosophy and higher thinking, of expression on a wider level.</p>
          <p className="aboutAstrologyDesc">Cancer and Capricorn area a polarity. Cancer is the sign of home life. The opposite sign, Capricorn, is the sign of public life.</p>
          <p className="aboutAstrologyDesc">Leo and Aquarius are a polarity. Leo is the sign of personal pleasure and creativity. The opposite sign, Aquarius, is the sign of hopes and ideals on a large scale.</p>
          <p className="aboutAstrologyDesc">Virgo and Pisces are a polarity. Virgo is the sign of work and self-improvement. The opposite sign, Pisces, is the sign of dreams and self-delusion.</p>
        </div>
        <div>
          <h1 className="mainAboutTitle">Finally</h1>
          <p className="aboutAstrologyDesc">Each of the twelve signs is attached to special associations in the outer world. There are lucky numbers, lucky days of the week, special colors, plants, metals, jewels, cities, etc. Each sign also has particular pitfalls and areas of danger attached to it.</p>
          <p className="aboutAstrologyDesc">In this modern day, however, some of these associations are quoted more for amusement than for guidance and instruction. Astrologers do not seriously suggest that if you are Aries you will like only the color red and wear diamonds, or if you are Virgo you will be happy living only in Boston and raising morning glories in your window box. The affinities to various colors, jewels, places, flowers are simply part of the long, long history of symbols and connections that has grown up around the signs of the zodiac.</p>
          <p className="aboutAstrologyDesc">Sometimes, however, it is fun to experiment with your zodiac affinities. I have a client, for example. who gives 'astrological' dinner parties and chooses flowers, table settings, and food that have certain connections to the zodiacal signs of her guests. Another client, who is a Gemini, recently took a trip to Melbourne, Australia, simply because of the affinity of his sign for that distant city. He wrote me ecstatically: 'The minute I stepped off the plan I just knew that I was truly at home!'</p>
          <p className="aboutAstrologyDesc">Part of the fascination of Astrology is in its complexity; the various associations and symbolism surrounding the twelve signs are part of that rich tapestry. No two astrological signs are are alike. Each one is different and unique. Each holds clues to who we are and the things and places to which we are drawn.</p>
        </div>
      </div>
    </>
  )
}

export default AboutAstrologyDesc
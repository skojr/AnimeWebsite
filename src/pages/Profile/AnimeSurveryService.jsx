export const fetchSurveyData = async (genreId, length) => {
    const recommendations = [];
    let currentPage = 1;

    try {
        // Loop through up to 5 pages
        while (recommendations.length < 5 && currentPage <= 5) {
            const response = await fetch(
                `https://api.jikan.moe/v4/top/anime?genres=${genreId}&page=${currentPage}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch anime data");
            }

            const data = await response.json();

            if (data.data.length === 0) {
                // No more results, break out of the loop
                break;
            }

            // Filter by Top Genre and Length
            const filteredData = data.data.filter((anime) => {
                // Check if the first genre matches the given genreId
                const isTopGenre = anime.genres.length > 0 && anime.genres[0].mal_id === genreId;

                // Check episode length
                const episodes = anime.episodes || 0; // Ensure episodes is a number
                const matchesLength =
                    (length === "short" && episodes <= 12) ||
                    (length === "medium" && episodes > 12 && episodes <= 24) ||
                    (length === "long" && episodes > 24);

                return isTopGenre && matchesLength;
            });

            // Add filtered data to recommendations
            recommendations.push(...filteredData);

            // Increment the page
            currentPage++;
        }

        // Return the top 5 recommendations
        return recommendations.slice(0, 5);
    } catch (error) {
        console.error("Error fetching survey data:", error);
        throw error;
    }
};



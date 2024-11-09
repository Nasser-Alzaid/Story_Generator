async function generateStory() {
  const prompt = document.getElementById("promptInput").value;

  if (!prompt) {
      alert("Please enter a prompt.");
      return;
  }

  try {
      const response = await fetch('http://localhost:5000/api/generateStory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: prompt })
      });

      const data = await response.json();

      if (data.story) {
          // Store the generated story in local storage to pass it to harry.html
          localStorage.setItem('generatedStory', data.story);
          // Redirect to harry.html to display the story
          window.location.href = './story.html';
      } else {
          alert("Sorry, no story was generated. Please try again.");
      }
  } catch (error) {
      console.error("Error generating story:", error);
      alert("Error generating story. Please try again later.");
  }
}

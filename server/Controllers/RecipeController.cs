
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RecipeManagementSystem.Hubs;
using Microsoft.EntityFrameworkCore;
using RecipeManagementSystem.Data;
using RecipeManagementSystem.Models;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeManagementSystem.Controllers
{
    [Route("api/recipes")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
         private readonly IHubContext<RecipeHub> _hubContext;

        public RecipeController(ApplicationDbContext context,IHubContext<RecipeHub> hubContext)
        {
            _context = context;
              _hubContext = hubContext;
        }
         // Get All Recipes (Accessible by all users)
        // [HttpGet("all")]
        // public IActionResult GetAllRecipes()
        // {
        //     var recipes = _context.Recipes
        //         .Select(r => new
        //         {
        //             r.Id,
        //             r.Title,
        //             r.Category,
        //             r.Description,
        //             r.Ingredients,
        //             r.Instructions,
        //             Image = r.Image != null ? Convert.ToBase64String(r.Image) : null
        //         })
        //         .ToList();

        //     return Ok(recipes);
        // }
// GET: Filter by Title and/or Category
// GET: api/recipes/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllRecipes([FromQuery] string? title, [FromQuery] string? category)
        {
            var query = _context.Recipes.AsQueryable();

            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(r => r.Title.Contains(title));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(r => r.Category == category);
            }

            var recipes = await query
                .Select(r => new
                {
                    r.Id,
                    r.Title,
                    r.Description,
                    r.Category,
                    r.Ingredients,
                    r.Instructions,
                    Image = r.Image != null ? Convert.ToBase64String(r.Image) : null
                })
                .ToListAsync();

            return Ok(recipes);
        }

        // GET: api/recipes/categories
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Recipes
                .Select(r => r.Category)
                .Distinct()
                .ToListAsync();

            return Ok(categories);
        }

         // Get Recipes by User (For "Your Recipes" Page)
        [HttpGet("user/{userId}")]
        public IActionResult GetUserRecipes(int userId)
        {
            var userRecipes = _context.Recipes
                .Where(r => r.UserId == userId)
                .Select(r => new
                {
                    r.Id,
                    r.Title,
                    r.Category,
                    r.Description,
                    r.Ingredients,
                    r.Instructions,
                    Image = r.Image != null ? Convert.ToBase64String(r.Image) : null
                })
                .ToList();

            return Ok(userRecipes);
        }

        // Add Recipe (For Logged-in Users)
        [HttpPost("add")]
        public async Task<IActionResult> AddRecipe([FromForm] RecipeDto model, [FromForm] IFormFile? image)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.UserEmail);

            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var newRecipe = new Recipe
            {
                Title = model.Title,
                Description = model.Description,
                Category = model.Category,
                Ingredients = model.Ingredients,
                Instructions = model.Instructions,
                UserId = user.Id,  // Assign UserId from the logged-in user
                CreatedAt = DateTime.Now
            };

            // Handle Image Upload
            if (image != null)
            {
                using var memoryStream = new MemoryStream();
                await image.CopyToAsync(memoryStream);
                newRecipe.Image = memoryStream.ToArray();
            }

            _context.Recipes.Add(newRecipe);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Recipe added successfully!" });
        }

        
        [HttpPut("{id}")]
public async Task<IActionResult> UpdateRecipe(int id, [FromForm] RecipeDto model, [FromForm] IFormFile? image)
{
    var recipe = await _context.Recipes.FindAsync(id);

    if (recipe == null)
        return NotFound(new { success = false, message = "Recipe not found" });

    // Update recipe details
    recipe.Title = model.Title;
    recipe.Description = model.Description;
    recipe.Category = model.Category;
    recipe.Ingredients = model.Ingredients;
    recipe.Instructions = model.Instructions;

    if (image != null)
    {
        using var memoryStream = new MemoryStream();
        await image.CopyToAsync(memoryStream);
        recipe.Image = memoryStream.ToArray();
    }

    await _context.SaveChangesAsync();
    await _hubContext.Clients.All.SendAsync("ReceiveRecipeUpdate");

    return Ok(new { success = true, message = "Recipe updated successfully!" });
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null)
                return NotFound(new { success = false, message = "Recipe not found" });

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveRecipeUpdate");

            return Ok(new { success = true, message = "Recipe deleted successfully" });
        }
    }

    public class RecipeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public string UserEmail { get; set; }  // Capturing logged-in user's email
    }
}
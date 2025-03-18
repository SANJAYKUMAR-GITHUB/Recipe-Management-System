// using Microsoft.AspNetCore.Mvc;
// using RecipeManagementSystem.Models;
// using RecipeManagementSystem.Data;
// using System.Linq;

// namespace RecipeManagementSystem.Controllers
// {
//     [Route("api/auth")]
//     [ApiController]
//     public class AuthController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public AuthController(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         [HttpPost("register")]
//         public IActionResult Register([FromBody] UserRegisterDto model)
//         {
//             if (_context.Users.Any(u => u.Email == model.Email))
//             {
//                 return BadRequest(new { success = false, message = "Email already registered" });
//             }

//             var newUser = new User
//             {
//                 Username = model.Username,
//                 Email = model.Email,
//                 PasswordHash = model.Password
//             };

//             _context.Users.Add(newUser);
//             _context.SaveChanges();

//             return Ok(new { success = true, message = "Registration successful" });
//         }
    


//      // Login Endpoint
//         [HttpPost("login")]
//         public IActionResult Login([FromBody] UserLoginDto model)
//         {
//             var user = _context.Users
//                 .SingleOrDefault(u => u.Email == model.Email && u.PasswordHash == model.Password);

//             if (user == null)
//                 return Unauthorized(new { success = false, message = "Invalid email or password" });

//             return Ok(new { success = true, user });
//         }
//     }

//     public class UserRegisterDto
//     {
//         public string Username { get; set; }
//         public string Email { get; set; }
//         public string Password { get; set; }
//     }

//      public class UserLoginDto
//     {
//         public string Email { get; set; }
//         public string Password { get; set; }
//     }
// }

using Microsoft.AspNetCore.Mvc;
using RecipeManagementSystem.Models;
using RecipeManagementSystem.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagementSystem.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Register Endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest(new { success = false, message = "Email already registered" });
            }

            var newUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = model.Password
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Registration successful" });
        }

        // ✅ Login Endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto model)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == model.Email && u.PasswordHash == model.Password);

            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid email or password" });
            }

            return Ok(new
            {
                success = true,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email
                }
            });
        }

        // ✅ Get User by ID Endpoint (Optional - Useful for fetching profile or details)
        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found" });
            }

            return Ok(new
            {
                success = true,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    createdAt = user.CreatedAt
                }
            });
        }

        // ✅ Logout Endpoint (Optional - Useful for clearing frontend session data)
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { success = true, message = "Logout successful" });
        }
    }

    // ✅ DTO for Registration
    public class UserRegisterDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    // ✅ DTO for Login
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

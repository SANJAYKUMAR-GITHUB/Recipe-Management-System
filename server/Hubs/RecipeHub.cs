using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace RecipeManagementSystem.Hubs
{
    public class RecipeHub : Hub
    {
        public async Task SendRecipeUpdate()
        {
            await Clients.All.SendAsync("ReceiveRecipeUpdate");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Wiki.Migrations
{
    public partial class thirdwiki : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Workspaces",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_UserId",
                table: "Workspaces",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_WorkspaceTypeId",
                table: "Workspaces",
                column: "WorkspaceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_AspNetUsers_UserId",
                table: "Workspaces",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_WorkspaceType_WorkspaceTypeId",
                table: "Workspaces",
                column: "WorkspaceTypeId",
                principalTable: "WorkspaceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_AspNetUsers_UserId",
                table: "Workspaces");

            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_WorkspaceType_WorkspaceTypeId",
                table: "Workspaces");

            migrationBuilder.DropIndex(
                name: "IX_Workspaces_UserId",
                table: "Workspaces");

            migrationBuilder.DropIndex(
                name: "IX_Workspaces_WorkspaceTypeId",
                table: "Workspaces");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Workspaces",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}

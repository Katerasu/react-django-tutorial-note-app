from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    # Title of the note, limited to 100 characters
    title = models.CharField(max_length=100)
    # Content of the note, no character limit
    content = models.TextField()
    # Timestamp for when the note was created, automatically set on creation
    created_at = models.DateTimeField(auto_now_add=True)
    # Foreign key to the User model, establishes a many-to-one relationship
    # If the user is deleted, all their notes will also be deleted (CASCADE)
    # related_name='notes' allows reverse lookup from User to their notes
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.title
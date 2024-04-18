import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from post.models import Post, Comment  # Replace 'your_app' with the name of your Django app
from user.models import Profile

class Command(BaseCommand):
    help = 'Populates the Comment model with comments and replies'

    def handle(self, *args, **options):
        Comment.objects.all().delete()  # Clear existing comments
        posts = Post.objects.all()
        profiles = Profile.objects.all()

        # Define some sample comment content
        comments = [
            "This is a great post!",
            "I found this post very helpful.",
            "Interesting topic, thanks for sharing!",
            "I have a question regarding this topic.",
            "I disagree with some points in this post.",
            "Can you provide more information about this?",
            "I appreciate the effort put into this post.",
            "Great job, keep up the good work!",
            "What impact does social media have on mental health, and how does it shape our perceptions of self and others? In this question, we examine the psychological, social, and emotional effects of social networking sites, from Facebook and Twitter to Instagram and Snapchat. Through the lens of cognitive psychology, sociology, and communication studies, we explore the ways in which social media platforms influence our mood, self-esteem, and relationships, shedding light on the complex interplay between technology and mental well-being in the digital age.",
    "How are earthquakes formed, and what causes them to occur? In this question, we delve into the geophysical processes and tectonic forces that drive seismic activity, from subduction zones and fault lines to plate boundaries and volcanic hotspots. Through the lens of seismology, geology, and earth science, we explore the mechanisms of earthquake generation, propagation, and detection, unraveling the mysteries of these powerful natural phenomena and their impact on human societies and the environment.",
    "Why is biodiversity important, and what are the implications of its loss for ecosystems and human societies? In this question, we explore the rich tapestry of life on Earth, from rainforests and coral reefs to savannas and tundras. Through the lens of ecology, conservation biology, and environmental ethics, we examine the intrinsic value of biodiversity, its role in ecosystem functioning, and the threats posed by habitat destruction, pollution, and climate change. By understanding the complex web of interactions that sustains life on our planet, we can better appreciate the urgent need to protect and preserve Earth's biodiversity for future generations.",
    "When did the Industrial Revolution begin, and how did it transform human societies and the global economy? In this question, we trace the origins of industrialization from the mechanization of textile production in 18th-century England to the rise of factories, railways, and steam engines. Through the lens of economic history, social theory, and technological innovation, we explore the profound social, cultural, and environmental changes brought about by the Industrial Revolution, from urbanization and mass production to pollution and class conflict.",
    "Which countries are leading in renewable energy production, and what strategies are they employing to transition to a sustainable energy future? In this question, we explore the dynamic landscape of renewable energy, from solar and wind power to hydroelectric and geothermal energy. Through the lens of energy policy, environmental economics, and technological innovation, we examine the global shift towards clean, renewable sources of energy, uncovering the challenges and opportunities of decarbonizing the global energy system.",
    "What are the causes of poverty, and how can we address the root causes of inequality and social injustice? In this question, we explore the complex web of factors that perpetuate poverty and economic inequality, from structural barriers and institutional discrimination to systemic racism and global capitalism. Through the lens of sociology, development economics, and political theory, we examine the interplay of social, economic, and political forces that shape patterns of poverty and marginalization, identifying pathways to a more just and equitable society for all.",
    "How does the stock market function, and what factors influence stock prices and investment decisions? In this question, we delve into the dynamic world of finance and investing, from the trading floors of Wall Street to the algorithms of high-frequency trading. Through the lens of financial economics, behavioral finance, and market psychology, we explore the mechanisms of price discovery, market efficiency, and investor behavior, shedding light on the opportunities and risks of participating in the global capital markets.",
    "Why do some species become endangered, and what can we do to protect and preserve biodiversity? In this question, we explore the complex factors that threaten the survival of species, from habitat destruction and climate change to poaching and pollution. Through the lens of conservation biology, ecology, and environmental policy, we examine the urgent need for conservation action, from species reintroduction and habitat restoration to wildlife protection and sustainable resource management.",
    "When was the internet invented, and how has it revolutionized communication, commerce, and culture? In this question, we trace the origins of the internet from its military and academic roots to the global network of interconnected computers that shapes our digital lives today. Through the lens of computer science, information technology, and media studies, we explore the evolution of the internet, from ARPANET and the World Wide Web to social media and cloud computing, unraveling the profound social, economic, and political implications of the digital revolution.",
    "Which is the largest desert in the world, and what unique ecosystems and adaptations characterize desert environments? In this question, we explore the vast expanses of arid landscapes, from the Sahara and the Gobi to the Atacama and the Australian Outback. Through the lens of ecology, climatology, and geology, we examine the diverse flora and fauna of deserts, from cacti and camels to lizards and scorpions, shedding light on the adaptations and survival strategies that enable life to thrive in these harsh and unforgiving environments.",
    "What are the benefits of meditation, and how does it promote mental, emotional, and physical well-being? In this question, we explore the ancient practice of meditation, from mindfulness and transcendental meditation to loving-kindness and vipassana. Through the lens of psychology, neuroscience, and contemplative studies, we examine the effects of meditation on brain function, stress reduction, and emotional regulation, uncovering the transformative power of mindfulness and awareness for cultivating inner peace and resilience in the face of life's challenges.",
    "How do vaccines work, and what role do they play in preventing infectious diseases and protecting public health? In this question, we explore the science of immunization, from the discovery of vaccines and the development of vaccination strategies to the mechanisms of immune response and herd immunity. Through the lens of microbiology, immunology, and public health, we examine the history, efficacy, and safety of vaccines, addressing common misconceptions and concerns about vaccination and promoting evidence-based approaches to disease prevention and control.",
    "Why do people procrastinate, and what strategies can help overcome procrastination and improve productivity? In this question, we delve into the psychology of procrastination, from the underlying causes and motivations to the cognitive biases and behavioral patterns that perpetuate this common habit. Through the lens of cognitive psychology, behavioral economics, and self-regulation theory, we explore the factors that contribute to procrastination, from fear of failure and perfectionism to lack of motivation and time management skills, offering practical tips and strategies for breaking the cycle of procrastination and achieving our goals.",
    "When was the first human landing on the moon, and what were the scientific and cultural significance of this historic event? In this question, we revisit the Apollo 11 mission and the iconic moment when Neil Armstrong took his first steps on the lunar surface, marking a giant leap for humanity and a triumph of science, engineering, and exploration. Through the lens of space history, planetary science, and cultural studies, we explore the legacy of the moon landing, from its geopolitical ramifications and technological innovations to its lasting impact on art, literature, and popular culture.",
    "Which factors contribute to economic inequality, and what policies can address disparities in wealth and income? In this question, we examine the complex web of economic, social, and political forces that shape patterns of inequality and distribution of resources, from globalization and automation to taxation and welfare reform. Through the lens of economics, sociology, and political economy, we explore the roots of economic inequality, from systemic racism and gender discrimination to structural barriers and institutional biases, offering insights into the role of public policy and social movements in promoting economic justice and equity for all.",
    "What are the long-term effects of plastic pollution, and how can we mitigate its impact on marine ecosystems and human health? In this question, we delve into the environmental crisis of plastic pollution, from the Great Pacific Garbage Patch to microplastics in the food chain. Through the lens of environmental science, ecology, and public health, we examine the ecological consequences of plastic pollution, from entanglement and ingestion to chemical contamination and habitat destruction, exploring innovative solutions and policies to reduce plastic waste and protect the health of our oceans and planet.",
            "I'm looking forward to more posts like this.",
            "This post inspired me to learn more about the topic.",
            "Thanks for sharing your insights.",
            "I had a similar experience, thanks for sharing yours.",
        ]

        # Populate comments for each post
        for post in posts:
            # Decide if this post should have comments (50% chance)
            if random.random() < 0.5:
                # Decide how many comments to add for each post (between 1 and 10)
                num_comments = random.randint(1, 10)
                for _ in range(num_comments):
                    # Choose a random author
                    author = random.choice(profiles)
                    # Choose a random comment content
                    content = random.choice(comments)
                    # Create the comment
                    comment = Comment.objects.create(post=post, author=author, content=content)

                    # Decide if this comment should have replies
                    if random.random() < 0.5:  # 50% chance of having replies
                        # Decide how many replies to add for this comment (between 1 and 5)
                        num_replies = random.randint(1, 5)
                        for _ in range(num_replies):
                            # Choose a random author for the reply
                            reply_author = random.choice(profiles)
                            # Choose a random reply content
                            reply_content = random.choice(comments)
                            # Create the reply under the comment
                            Comment.objects.create(post=post, author=reply_author, content=reply_content, parent_comment=comment)

            self.stdout.write(self.style.SUCCESS(f'Successfully added comments and replies to post "{post.name}"'))

        self.stdout.write(self.style.SUCCESS('Successfully populated Comment model with comments and replies'))